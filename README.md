# Entropie - Business Intelligence Platform

A modern, AI-powered business intelligence and analytics platform designed for data-driven decision making. Entropie combines interactive dashboards, real-time analytics, and intelligent chat capabilities to help businesses understand and optimize their operations.

## Features

### Dashboard & Analytics
- **Real-time KPI Monitoring**: Track key performance indicators including revenue, orders, products, and customer metrics
- **Interactive Charts**: Visualize sales trends, stock levels, margins, and performance metrics with dynamic, responsive charts
- **Advanced Visualizations**:
  - Sales Evolution: Line chart with period comparison (7/30/90 days)
  - Stock Distribution: Donut chart by category
  - Top Products: Horizontal bar chart of best-stocked items
  - Performance Radar: Multi-dimensional performance view
  - Top Clients: Ranked customer list with revenue
  - Margin Evolution: Area chart tracking profit margins
- **Interactive Dashboard**: PyGWalker integration for custom data exploration

### AI-Powered Chat Interface
- **Clean Modern Interface**: Light-themed chat interface with white background, matching the application's professional aesthetic
- **Quick Suggestions**: Pre-configured queries for common business questions (Commandes incohérentes, Risque de rupture, Marge par client, Retards de paiement)
- **Elegant Input Box**: White input box with subtle borders and shadow effects, featuring gradient orange send button
- **Natural Language Queries**: Ask questions about your business data in plain language
- **Contextual Responses**: Get intelligent, context-aware answers powered by RAG (Retrieval-Augmented Generation)
- **Attachment Support**: Upload documents and files for analysis

### Data Tables
- **Multiple Table Views**: Toggle between Clients, Articles, and Fournisseurs
- **Sticky Navigation**: Tab selection remains visible while scrolling through data
- **Comprehensive Data Display**: View and manage all your business data in organized tables
- **Responsive Design**: Tables adapt to different screen sizes with proper scrolling

### Purchase Order Management
- **Order Tracking**: View and manage all purchase orders in one place
- **Advanced Search**: Filter orders by reference, supplier, product, or status
- **Multi-level Organization**:
  - Orders with multiple product lines
  - Products with multiple parcels
  - Detailed parcel information (weight, DLC, number)
- **Document Viewer**: Integrated PDF viewer for delivery notes and invoices
- **Status Management**: Validate orders and track delivery status
- **Real-time Calculations**: Automatic weight totals and parcel counts

### Support Request System
- **Multi-Contact Options**: Choose preferred contact method (Email, Phone, Both)
- **Request Classification**: Categorize requests by type (Conseil, Technical, Commercial, Billing)
- **Priority Levels**: Set urgency levels from Low to Urgent
- **Budget & Timeline**: Specify estimated budget and desired timeline
- **Detailed Descriptions**: Provide comprehensive request details
- **Attachment Descriptions**: Describe files to be sent separately via email
- **Form Validation**: Comprehensive validation with user-friendly error messages
- **Information Section**: Important details about response times and process
- **Immediate Help Section**: Contact options (Phone, Email, Live Chat) for urgent needs

### User Experience
- **Modern UI/UX**: Clean, professional interface with smooth animations and transitions
- **Cohesive Design System**: Consistent white background throughout the application for a unified look
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Scrolling**: All pages properly scrollable with correct overflow handling, sticky navigation where appropriate
- **French Language Support**: Native French interface (easily extensible to other languages)
- **Professional Color Scheme**: White base with orange accents and subtle purple highlights for a business-focused aesthetic
- **Progressive Disclosure**: Features marked as "Bientôt" (Coming Soon) when not yet available

## Key Highlights

- **Production-Ready UI**: Professional design with clean white base and orange accents
- **Full TypeScript**: Type-safe codebase with comprehensive type definitions
- **Mock Data System**: Complete mock data infrastructure for independent frontend development
- **Modular Architecture**: Clean separation of concerns with reusable components
- **Form Validation**: Robust validation using Zod schemas and React Hook Form
- **Responsive Charts**: Dynamic data visualizations using Recharts
- **Smooth UX**: Properly configured overflow and scrolling on all pages with sticky navigation elements
- **Development Ready**: Backend FastAPI + PostgreSQL prêt à être branché
- **Feature Status Indicators**: Clear visual indicators for features in development

## Tech Stack

### Frontend
- **React 18.3**: Modern React with hooks and functional components
- **TypeScript 5.5**: Full type safety and enhanced developer experience
- **Vite 5.4**: Lightning-fast build tool and development server
- **React Router 7.11**: Client-side routing and navigation
- **Tailwind CSS 3.4**: Utility-first CSS framework for rapid UI development
- **Recharts 3.6**: Composable charting library for data visualization
- **Lucide React 0.344**: Beautiful, consistent icon library
- **React Hook Form 7.69**: Performant form validation with Zod schema validation
- **React Hot Toast 2.6**: Elegant toast notifications
- (Supabase retiré) Stack centrée sur FastAPI/PostgreSQL
- **Zod 4.2**: TypeScript-first schema validation

### Backend
- **FastAPI**: API layer pour les articles avec SQLAlchemy
- **PostgreSQL**: Données des articles (table `dim_produit` ou équivalent)
- **SQLAlchemy / psycopg**: ORM + driver Postgres
- **(Futur)** RAG/LLM et autres endpoints (chat, dashboards, rapports)

### Development Tools
- **ESLint**: Code linting and style enforcement
- **PostCSS**: CSS transformations and optimizations
- **Autoprefixer**: Automatic vendor prefix handling

## Project Structure

```
entropie/
├── src/
│   ├── api/                    # API client and service layer
│   │   ├── articlesApi.ts     # Articles (FastAPI)
│   │   ├── client.ts          # Base HTTP client configuration
│   │   ├── chatApi.ts         # Chat/AI endpoints (placeholder)
│   │   ├── dashboardApi.ts    # Dashboard data endpoints
│   │   └── reportsApi.ts      # Reports generation endpoints
│   │
│   ├── components/            # React components
│   │   ├── chat/             # Chat interface components
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   └── MessageBubble.tsx
│   │   │
│   │   ├── dashboard/        # Dashboard components
│   │   │   ├── KpiCard.tsx
│   │   │   ├── PeriodTabs.tsx
│   │   │   ├── SalesChart.tsx
│   │   │   ├── StockDonut.tsx
│   │   │   ├── TopProducts.tsx
│   │   │   ├── PerformanceRadar.tsx
│   │   │   ├── TopClients.tsx
│   │   │   └── MarginEvolution.tsx
│   │   │
│   │   ├── purchase/         # Purchase order components
│   │   │   ├── OrderRow.tsx
│   │   │   ├── ParcelCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── DocumentViewer.tsx
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── AppLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Skeleton.tsx
│   │       ├── Textarea.tsx
│   │       └── FileUpload.tsx
│   │
│   ├── pages/               # Page components
│   │   ├── Home.tsx                  # Landing page with AI chat
│   │   ├── Dashboard.tsx             # Analytics dashboard
│   │   ├── InteractiveDashboard.tsx  # Graphic Walker integration
│   │   ├── CommandeAchat.tsx         # Purchase order management
│   │   └── Reports.tsx               # Support request form
│   │
│   ├── mock/               # Mock data for development
│   │   ├── chat.ts
│   │   ├── dashboard.ts
│   │   └── tables.ts       # Mock tables (articles/clients/fournisseurs)
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── lib/                # Utility libraries
│   │
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
│
├── backend/                # Backend API (FastAPI)
│   ├── .PRODAL/           # Environnement virtuel Python
│   ├── .env               # Variables d’environnement backend (non versionné)
│   ├── requirements.txt   # Dépendances Python
│   ├── app/
│   │   ├── api/           # Routes FastAPI (articles, placeholders chat/dashboard/rapports)
│   │   ├── core/          # Configuration (pydantic-settings)
│   │   ├── db.py          # Engine, SessionLocal, Base, get_db
│   │   ├── models/        # Modèles SQLAlchemy (Article)
│   │   ├── schemas/       # Schémas Pydantic (ArticleOut)
│   │   ├── services/      # Placeholders métier
│   │   └── main.py        # Application FastAPI (CORS, routes)
│   │
│   └── temporal/          # Workflows Temporal
│       ├── activities/    # Activities (extraction PDF)
│       ├── workers/       # Worker Temporal
│       └── workflows/     # Définition des workflows
│
│
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # NPM dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- **Node.js**: ≥ 18
- **npm**: ≥ 9
- **Python**: 3.11+ (un venv `.PRODAL` est déjà présent)
- **PostgreSQL**: base accessible avec la table des articles

### Configuration rapide

- Frontend : créez un fichier `.env` à la racine avec `VITE_API_URL=http://localhost:8000` (ou l’URL de votre backend FastAPI).
- Docker : le service FastAPI doit écouter sur `8000`.
- **Navigateur**: Chrome/Firefox/Safari/Edge récent

### Backend (FastAPI + PostgreSQL)

1. Copier l’environnement et renseigner la connexion :
   ```bash
   cd backend
   cp .env.example .env
   # édite .env et mets DATABASE_URL=postgresql+psycopg://user:pass@host:5432/ta_base
   ```
2. Activer le venv :
   ```bash
   source .PRODAL/bin/activate
   ```
   Sur Apple Silicon, préférez Python 3.11 ou 3.12 (PyGWalker dépend de `duckdb==0.10.1` qui n’a pas de wheel stable pour 3.13).
3. Installer si besoin :
   ```bash
   pip install -r requirements.txt
   ```
4. Vérifier le modèle :
   - `backend/app/models/article.py` → `__tablename__` (ex: dim_produit) et colonnes (produit_id, code_produit_source, libelle_produit, etc.).
   - Ajouter `__table_args__ = {"schema": "<schema>"}` si la table n’est pas dans `public`.
5. Lancer l’API :
   ```bash
   uvicorn app.main:app --reload --port 8000 --app-dir .
   ```
   Endpoint : `http://localhost:8000/api/articles`

### Workflows Temporal

Le parsing des commandes d’achat passe par Temporal.

- Endpoint déclencheur : `POST /api/commande-achat/parse`
- Workflow appelé : `PurchaseOrderParseWorkflow`
- File de tâches : `TEMPORAL_TASK_QUEUE` (défaut `purchase-order-queue`)
- Worker : `backend/temporal/workers/worker.py`
- Activity principale : `backend/temporal/activities/purchase_order_activity.py`

Pré-requis (worker) :
- `OPENAI_API_KEY` (obligatoire)
- `OPENAI_MODEL` (optionnel, défaut `gpt-4o`)
- `TEMPORAL_SERVER` (défaut `localhost:7233`)
- `TEMPORAL_NAMESPACE` (défaut `default`)

Exécution locale (exemple) :
```bash
# Démarrer Temporal via le CLI
temporal server start-dev

# Lancer le worker (package temporal)
PYTHONPATH=backend python -m temporal.workers.worker
```

Puis appeler l’API :
```
POST http://localhost:8000/api/commande-achat/parse
```

### Graphic Walker (React)

- Endpoint data : `http://localhost:8000/api/data/pygwalker`
- Table source : `marts.pygwalker_global`
- Exemple :
  ```
  http://localhost:8000/api/data/pygwalker?limit=10000
  ```
- Composant front : `src/pages/InteractiveDashboard.tsx` (utilise `@kanaries/graphic-walker`).

### Frontend (Vite/React)

1. À la racine :
   ```bash
   npm install
   echo "VITE_API_URL=http://localhost:8000" > .env   # si besoin
   npm run dev
   ```
2. Ouvrir `http://localhost:5173` et onglet “Tables” pour voir les articles.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler to check types |

## Development Workflow

### Component Development

All components are organized by feature and follow a consistent pattern:

1. **UI Components** (`src/components/ui/`): Reusable, generic components
2. **Feature Components** (`src/components/[feature]/`): Feature-specific components
3. **Layout Components** (`src/components/layout/`): Page layout and navigation
4. **Pages** (`src/pages/`): Top-level route components

### State Management

Currently using React's built-in state management with hooks:
- `useState` for local component state
- `useEffect` for side effects
- Props for data flow between components

Future consideration: Context API or state management library for global state

### Styling Conventions

- **Tailwind CSS**: Primary styling approach using utility classes
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Color Scheme**: Clean professional theme with strategic accents
  - Background: White (#FFFFFF)
  - Primary: Orange-500 to Orange-600 (gradient buttons)
  - Subtle accents: Purple-300, Purple-50 (hover states)
  - Text: Gray-900 (#111827)
  - Borders: Gray-200 (#E5E7EB)

### API Integration

API calls are centralized in the `src/api/` directory:

```typescript
// Example API usage
import { getDashboardData } from '@/api/dashboardApi';

const data = await getDashboardData('week');
```

Currently using mock data for development. Backend integration is planned.

## Architecture

### Frontend Architecture

```
User Interface (Pages)
        ↓
    Components
        ↓
   API Layer
        ↓
  Backend/Mock Data
```

### Data Flow

1. User interacts with a page component
2. Page component uses feature-specific components
3. Components call API functions
4. API layer handles HTTP requests/mock data
5. Data flows back up through components
6. UI updates with new data

### Future Backend Architecture

```
Frontend (React/Vite)
        ↓
    FastAPI REST API
        ↓
   Business Logic Layer
        ↓
  ┌──────┴──────┐
  ↓             ↓
PostgreSQL    RAG System
(Supabase)   (AI/Vector DB)
```

## Key Features Explained

### Dashboard System

The dashboard provides a comprehensive view of business metrics:

- **KPI Cards**: Display 8 critical metrics with change indicators and trend analysis
- **Sales Evolution**: Interactive line chart with period selector (7/30/90 days)
- **Stock Distribution**: Donut chart showing inventory by category
- **Top Products**: Horizontal bar chart of best-stocked items
- **Performance Radar**: Multi-dimensional view of key performance indicators
- **Top Clients**: Ranked list of best customers by revenue
- **Margin Evolution**: Area chart tracking profit margins over time
- **Real-time Updates**: Automatic data refresh (when connected to backend)

### Chat Interface

AI-powered chat for natural language business queries:

- **Clean Modern Design**: White input box with subtle borders and elegant shadow effects
- **Cohesive Styling**: Matches the application's overall white background theme
- **Quick Suggestions**: Click-to-fill suggestion chips for common queries:
  - Commandes incohérentes
  - Risque de rupture (7)
  - Marge par client (30)
  - Retards de paiement
- **File Attachments**: Upload documents for analysis via paperclip icon
- **One-click Send**: Gradient orange send button for quick submissions
- **Message History**: Conversation context maintained
- **Streaming Responses**: Real-time AI response generation

### Support Request Form

Comprehensive support request system accessible from the "Rapports" section:

- **Contact Method Selection**:
  - Email, Phone, or Both options
  - Radio button selection for user preference
- **Request Details**:
  - Type: Conseil, Technical Support, Commercial, Billing, Other
  - Priority: Low (1+ week), Normal (few days), High (24h), Urgent (immediate)
  - Budget estimation: Ranges from <1,000€ to >10,000€
  - Deadline: From 1 week to flexible
- **Form Fields**:
  - Subject line (minimum 3 characters)
  - Detailed description (minimum 10 characters)
  - Attachment descriptions (list files to send separately)
- **Information Section**: Blue-highlighted box with key information:
  - Response time: 24-48h
  - Priority handling for urgent requests
  - Email confirmation upon submission
- **Immediate Help Section**: Contact card with three options:
  - Phone: 01 23 45 67 89 (Mon-Fri 9h-18h)
  - Email: support@dashboard.com (Response within 24h)
  - Live Chat: Available 24/7
- **Current Implementation**: Form validates and logs to console for development

### Purchase Order Management

Comprehensive system for managing purchase orders:

- **Three-level Hierarchy**:
  - Orders (top level with supplier and date info)
  - Product Lines (items within each order)
  - Parcels (individual packages with weight, DLC, and tracking)
- **Advanced Search & Filters**:
  - Search by order reference, supplier, or product name
  - Filter by status (pending/validated)
  - Filter by supplier
  - Filter by date
- **Document Management**:
  - Integrated PDF viewer for delivery notes and invoices
  - Expandable document viewer within the interface
- **Order Operations**:
  - Validate entire orders
  - Delete orders
  - Remove individual parcels
  - Expand/collapse product details
- **Real-time Statistics**:
  - Total orders count
  - Validated orders count
  - Total weight calculation
  - Total parcel count

### Navigation

Sidebar navigation with key sections:

- **Home**: AI chat interface with quick suggestions for business queries
- **Tableaux de bords**: Dashboard access
  - Tous les tableaux de bords: Comprehensive analytics dashboard with 6+ charts
  - Dashboard Interactif: PyGWalker integration for custom data exploration
  - Tables: Data tables with sticky tab navigation for Clients, Articles, and Fournisseurs
- **Temporal**: Workflows d’automatisation
  - Commande Achat: Purchase order management with document viewer
  - Commande Vente: Sales order processing (Coming Soon - marked as "Bientôt")
- **Bottom Section**:
  - **Rapports**: Support request form with multi-level classification, priority settings, and immediate help options
  - **User Profile**: Profile section for settings and account management

## Customization

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`

### Adding New Charts

Using Recharts for data visualization:

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

### Styling Customization

Modify `tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      spacing: {
        // Add custom spacing
      },
    },
  },
}
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android latest

## Performance Considerations

- **Code Splitting**: Implemented via React Router lazy loading (future)
- **Lazy Loading**: Images and components loaded on demand
- **Memoization**: React.memo and useMemo for expensive computations
- **Bundle Size**: Current production bundle ~1.3MB (can be optimized with code splitting)

## Current Status

### Implemented Features
- [x] React frontend with TypeScript
- [x] Responsive dashboard with multiple chart types
- [x] Purchase order management system
- [x] Support request form with validation
- [x] AI chat interface (UI only)
- [x] Mock data for development
- [x] Supabase database configuration
- [x] Professional UI/UX with smooth scrolling

### In Progress
- [ ] Backend API integration
- [ ] Real-time data connection
- [ ] Support request submission to database

## Future Roadmap

### Phase 1: Backend Integration
- [ ] Implement FastAPI backend
- [ ] Connect support form to Supabase
- [ ] Implement authentication system
- [ ] Create real API endpoints for dashboard data

### Phase 2: AI/RAG System
- [ ] Set up vector database
- [ ] Implement RAG pipeline
- [ ] Train on business documentation
- [ ] Connect chat interface to AI backend

### Phase 3: Advanced Features
- [ ] Real-time data synchronization
- [ ] Advanced report builder
- [ ] Custom dashboard creation
- [ ] Multi-language support
- [ ] Mobile application

### Phase 4: Enterprise Features
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Data export/import
- [ ] API documentation
- [ ] Webhook integrations

## Troubleshooting

### Common Issues

**Development server won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Run type checking
npm run typecheck

# Check for linting issues
npm run lint
```

**Port already in use**
```bash
# Vite uses port 5173 by default
# Kill the process or specify a different port
npm run dev -- --port 3000
```

### Getting Help

- Check the [Issues](link-to-issues) page
- Review component documentation
- Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful component and variable names
- Add comments for complex logic
- Keep components small and focused
- Use white backgrounds with orange accents as primary color scheme
- Maintain consistent spacing and responsive design patterns

## Quick Reference

### Key Files to Modify

- **Add new page**: Create in `src/pages/`, add route in `App.tsx`, add nav in `Sidebar.tsx`
- **Add new chart**: Use Recharts components in `src/components/dashboard/`
- **Modify colors**: Edit `tailwind.config.js` theme
- **Update mock data**: Edit files in `src/mock/`
- **Add form validation**: Use Zod schemas with React Hook Form

### Common Commands

```bash
npm run dev          # Start dev server on port 5173
npm run build        # Production build
npm run preview      # Test production build
npm run lint         # Check code style
npm run typecheck    # Check TypeScript types
```

### Database Migrations

Migrations are located in `supabase/migrations/`. Current migrations:
- Support requests table
- Storage buckets for attachments

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact the development team.

---

**Built with React, TypeScript, and Vite**
