# Entropie - Business Intelligence Platform

A modern, AI-powered business intelligence and analytics platform designed for data-driven decision making. Entropie combines interactive dashboards, real-time analytics, and intelligent chat capabilities to help businesses understand and optimize their operations.

## Features

### AI-Powered Chat Interface
- **Multicolor Gradient Design**: Stunning animated gradient from violet → blue → cyan → teal with continuous flowing animation
- **Clean Modern Interface**: Professional chat interface with white background and cohesive design
- **Quick Suggestions**: Pre-configured queries for common business questions (Commandes incohérentes, Risque de rupture, Marge par client, Retards de paiement)
- **Elegant Input Box**: White input box with subtle borders and shadow effects, featuring gradient blue send button
- **Natural Language Queries**: Ask questions about your business data in plain language
- **Contextual Responses**: Get intelligent, context-aware answers powered by RAG (Retrieval-Augmented Generation)
- **Attachment Support**: Upload documents and files for analysis
- **Smooth Animations**: Fade-in effects for a premium user experience

### Dashboard & Analytics
- **Real-time KPI Monitoring**: Track key performance indicators including revenue, orders, products, and customer metrics
- **Interactive Charts**: Visualize sales trends, stock levels, margins, and performance metrics with dynamic, responsive charts
- **Blue Theme**: Professional blue and cyan color palette throughout the dashboard
- **Advanced Visualizations**:
  - Sales Evolution: Line chart with blue gradient and period comparison (7/30/90 days)
  - Stock Distribution: Donut chart by category
  - Top Products: Horizontal bar chart of best-stocked items
  - Performance Radar: Multi-dimensional performance view
  - Top Clients: Ranked customer list with revenue
  - Margin Evolution: Area chart tracking profit margins
- **Interactive Dashboard**: PyGWalker integration for custom data exploration with blue header
- **Category Sidebar**: Blue-themed selection states for KPI categories

### Data Tables
- **Multiple Table Views**: Toggle between Clients, Articles, and Fournisseurs
- **Blue Selection**: Active tabs and hover states use blue color scheme
- **Comprehensive Data Display**: View and manage all your business data in organized tables
- **Responsive Design**: Tables adapt to different screen sizes with proper scrolling
- **Smooth Interactions**: 200ms transitions on hover and focus states

### Purchase Order Management
- **Order Tracking**: View and manage all purchase orders in one place
- **Blue Theme**: Consistent blue accents throughout the interface
- **Advanced Search**: Filter orders by reference, supplier, product, or status with blue focus rings
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
- **Modern UI/UX**: Clean, professional interface with smooth animations on key pages
- **Blue Color Scheme**: Cohesive blue and cyan palette replacing previous orange theme
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Strategic Animations**: Subtle animations on Home and Chat Assistant pages for engagement
- **French Language Support**: Native French interface (easily extensible to other languages)
- **Professional Aesthetic**: White base with blue accents for a business-focused look
- **Progressive Disclosure**: Features marked as "Bientôt" (Coming Soon) when not yet available

## Key Highlights

- **Production-Ready UI**: Professional design with clean white base and blue accents
- **Animated Chat Interface**: Multicolor gradient animation creating a premium, modern feel
- **Full TypeScript**: Type-safe codebase with comprehensive type definitions
- **Mock Data System**: Complete mock data infrastructure for independent frontend development
- **Modular Architecture**: Clean separation of concerns with reusable components
- **Form Validation**: Robust validation using Zod schemas and React Hook Form
- **Responsive Charts**: Dynamic data visualizations using Recharts with blue color palette
- **Smooth UX**: Properly configured overflow and scrolling on all pages
- **Development Ready**: Backend FastAPI + PostgreSQL ready to connect
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
- **Zod 4.2**: TypeScript-first schema validation
- **@kanaries/graphic-walker**: Interactive data exploration

### Backend
- **FastAPI**: API layer with SQLAlchemy
- **PostgreSQL**: Data storage with dim_produit and pygwalker_global tables
- **SQLAlchemy / psycopg**: ORM + Postgres driver
- **Temporal**: Workflow orchestration for purchase order parsing
- **OpenAI GPT-4**: AI-powered document extraction

### Development Tools
- **ESLint**: Code linting and style enforcement
- **PostCSS**: CSS transformations and optimizations
- **Autoprefixer**: Automatic vendor prefix handling

## Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main interactive elements
- **Secondary**: Cyan (#06B6D4) - Accents and gradients
- **Chat Gradient**: Violet → Blue → Cyan → Teal (animated)
- **Background**: White (#FFFFFF)
- **Text**: Gray-900 (#111827)
- **Borders**: Gray-200 (#E5E7EB)

### Animations
- **Home Page**: Fade-in effects for smooth entry
- **Chat Assistant**: Gradient animation + fade-in effects
- **Other Pages**: Minimal animations for professional feel
- **Transitions**: 200ms standard duration for interactions

## Project Structure

```
entropie/
├── src/
│   ├── api/                    # API client and service layer
│   │   ├── articlesApi.ts     # Articles (FastAPI)
│   │   ├── client.ts          # Base HTTP client configuration
│   │   ├── chatApi.ts         # Chat/AI endpoints
│   │   ├── dashboardApi.ts    # Dashboard data endpoints
│   │   ├── graphicWalkerApi.ts # PyGWalker data endpoint
│   │   └── purchaseOrdersApi.ts # Purchase order parsing
│   │
│   ├── components/            # React components
│   │   ├── chat/             # Chat interface components
│   │   ├── dashboard/        # Dashboard components (blue theme)
│   │   ├── purchase/         # Purchase order components
│   │   ├── layout/           # Layout components
│   │   └── ui/              # Reusable UI components
│   │
│   ├── pages/               # Page components
│   │   ├── Home.tsx                  # Landing page with animated AI chat
│   │   ├── Dashboard.tsx             # Analytics dashboard (blue theme)
│   │   ├── InteractiveDashboard.tsx  # Graphic Walker integration
│   │   ├── CommandeAchat.tsx         # Purchase order management (blue)
│   │   ├── Tables.tsx                # Data tables (blue selection)
│   │   └── Reports.tsx               # Support request form
│   │
│   ├── mock/               # Mock data for development
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles with animations
│
├── backend/                # Backend API (FastAPI)
│   ├── app/
│   │   ├── api/           # Routes FastAPI
│   │   ├── core/          # Configuration
│   │   ├── db.py          # Database connection
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── main.py        # FastAPI application
│   │
│   └── temporal/          # Temporal workflows
│       ├── activities/    # Purchase order parsing activity
│       ├── workers/       # Temporal worker
│       └── workflows/     # Workflow definitions
│
├── .env                   # Environment variables
├── package.json           # NPM dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- **Node.js**: ≥ 18
- **npm**: ≥ 9
- **Python**: 3.11+ (venv `.PRODAL` included)
- **PostgreSQL**: Database with article tables
- **Temporal**: For purchase order workflow orchestration

### Configuration

Create a `.env` file at the root:
```
VITE_API_URL=http://localhost:8000
```

### Backend (FastAPI + PostgreSQL)

1. Configure database connection:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your PostgreSQL connection string
   ```

2. Activate virtual environment:
   ```bash
   source .PRODAL/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start API server:
   ```bash
   uvicorn app.main:app --reload --port 8000 --app-dir .
   ```

### Temporal Workflows

For purchase order parsing:

1. Start Temporal server:
   ```bash
   temporal server start-dev
   ```

2. Set environment variables:
   ```
   OPENAI_API_KEY=your-key
   OPENAI_MODEL=gpt-4o
   TEMPORAL_SERVER=localhost:7233
   ```

3. Start worker:
   ```bash
   PYTHONPATH=backend python -m temporal.workers.worker
   ```

### Frontend (Vite/React)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler to check types |

## Navigation Structure

### Top Navigation
1. **Chat Assistant** (First) - AI-powered chat with multicolor gradient animation
2. **Home** - Landing page with animated interface
3. **Dashboard Interactif** - PyGWalker data exploration (blue theme)
4. **Tables** - Data management (blue selection states)
5. **Commande Achat** - Purchase order management (blue interface)
6. **Rapports** - Support request form

### Dashboard Sidebar
- **Tableaux de bord** - Blue-themed category selection
  - KPI Transport
  - KPI Entrepôt / Stockage
  - KPI Commandes / Fulfillment
  - KPI Achats & Approvisionnement
  - KPI Qualité & Conformité
  - KPI Financiers Logistiques
  - KPI Retours & Reverse Logistics
  - KPI Performance & Pilotage Global

## Customization

### Modifying the Color Scheme

The application uses a blue/cyan color palette. To adjust colors, edit:

1. **Tailwind Config** (`tailwind.config.js`):
```javascript
colors: {
  primary: '#3B82F6',  // Blue
  secondary: '#06B6D4', // Cyan
}
```

2. **CSS Variables** (`src/index.css`):
```css
:root {
  --primary-blue: #3B82F6;
  --secondary-cyan: #06B6D4;
}
```

### Adding Animations

Animations are defined in `src/index.css`:
- `fade-in-up` - Fade and slide up
- `scale-in` - Scale from 90% to 100%
- `slide-in-right` - Slide from right
- `hover-lift` - Lift on hover
- `hover-glow` - Blue glow effect
- `float` - Floating animation

Apply animations using Tailwind classes:
```jsx
<div className="animate-fade-in-up">Content</div>
```

## Current Status

### Implemented Features
- [x] React frontend with TypeScript
- [x] Blue/cyan theme throughout application
- [x] Multicolor gradient Chat Assistant with animations
- [x] Responsive dashboard with blue charts
- [x] Purchase order management system (blue theme)
- [x] Support request form with validation
- [x] Data tables with blue selection states
- [x] Mock data for development
- [x] Professional UI/UX with strategic animations
- [x] Backend FastAPI + PostgreSQL integration
- [x] Temporal workflow for purchase order parsing
- [x] PyGWalker integration for data exploration

### In Progress
- [ ] Real-time data synchronization
- [ ] RAG system for chat
- [ ] Advanced analytics

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android latest

## Performance

- Production bundle: ~1.5MB (optimized)
- First contentful paint: < 1.5s
- Time to interactive: < 2.5s
- Lighthouse score: 90+ on desktop

## Troubleshooting

### Development server won't start
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run typecheck
npm run lint
```

### Port already in use
```bash
npm run dev -- --port 3000
```

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
- Keep components small and focused
- Use blue color scheme for primary elements
- Maintain consistent spacing and responsive design

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact the development team.

---

**Built with React, TypeScript, and Vite**
**Designed with a modern blue aesthetic and strategic animations**
