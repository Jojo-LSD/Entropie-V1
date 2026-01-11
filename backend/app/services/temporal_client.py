import os
from typing import Optional

from temporalio.client import Client

_client: Optional[Client] = None


async def get_temporal_client() -> Client:
    global _client
    if _client is None:
        server = os.environ.get("TEMPORAL_SERVER", "localhost:7233")
        namespace = os.environ.get("TEMPORAL_NAMESPACE", "default")
        _client = await Client.connect(server, namespace=namespace)
    return _client
