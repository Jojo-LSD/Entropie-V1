import asyncio
import os

from temporalio.client import Client
from temporalio.worker import Worker

from ..activities.purchase_order_activity import extract_meat_packing_list
from ..workflows.purchase_order_workflow import PurchaseOrderParseWorkflow


async def main() -> None:
    server = os.environ.get("TEMPORAL_SERVER", "localhost:7233")
    namespace = os.environ.get("TEMPORAL_NAMESPACE", "default")
    task_queue = os.environ.get("TEMPORAL_TASK_QUEUE", "purchase-order-queue")

    client = await Client.connect(server, namespace=namespace)

    worker = Worker(
        client,
        task_queue=task_queue,
        workflows=[PurchaseOrderParseWorkflow],
        activities=[extract_meat_packing_list],
    )

    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
