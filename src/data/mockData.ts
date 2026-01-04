import { Thread, FileItem, TableItem, ModelOption } from '@/types/evren';

export const mockThreads: Thread[] = [
  { id: '1', title: 'Wind Farm SOP Analysis', date: new Date(), isPinned: false },
  { id: '2', title: 'Solar Panel Audit Request', date: new Date(), isPinned: false },
  { id: '3', title: 'Greetings and introduct...', date: new Date(), isPinned: false },
  { id: '4', title: 'Revenue Management SOP...', date: new Date(Date.now() - 86400000), isPinned: false },
  { id: '5', title: 'Grid Integration Report', date: new Date(Date.now() - 86400000 * 2), isPinned: false },
  { id: '6', title: 'Request for conversatio...', date: new Date(Date.now() - 86400000 * 3), isPinned: false },
  { id: '7', title: 'Capex Proposal — Offshore Wind', date: new Date(Date.now() - 86400000 * 4), isPinned: false },
  { id: '8', title: 'Document request clarif...', date: new Date(Date.now() - 86400000 * 5), isPinned: false },
  { id: '9', title: 'Greeting and interaction', date: new Date(Date.now() - 86400000 * 6), isPinned: false },
  { id: '10', title: 'Energy Storage Analysis', date: new Date(Date.now() - 86400000 * 7), isPinned: false },
];

export const mockDocuments: FileItem[] = [
  {
    id: 'folder-1',
    name: 'My Documents',
    type: 'file',
    isFolder: true,
    isExpanded: true,
    children: [
      { id: 'file-1', name: 'WindFarmSOP.pdf', type: 'pdf' },
      { id: 'file-2', name: 'solar-panel-specs.jpg', type: 'image' },
      { id: 'file-3', name: 'energy-data-2024.xlsx', type: 'excel' },
      { id: 'file-4', name: 'grid-report.docx', type: 'word' },
      { id: 'file-5', name: 'turbine-maintenance.pdf', type: 'pdf' },
      { id: 'file-6', name: 'capex-proposal.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'folder-2',
    name: 'AI-Energy-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [
      { id: 'file-7', name: 'offshore-wind-study.pdf', type: 'pdf' },
      { id: 'file-8', name: 'renewable-forecast.xlsx', type: 'excel' },
    ],
  },
  {
    id: 'folder-3',
    name: 'AI-Finance-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [
      { id: 'file-9', name: 'budget-2024.xlsx', type: 'excel' },
      { id: 'file-10', name: 'investment-analysis.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'folder-4',
    name: 'AI-HR-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [
      { id: 'file-11', name: 'employee-handbook.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'folder-5',
    name: 'AI-Legal-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [],
  },
  {
    id: 'folder-6',
    name: 'AI-Treasury-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [],
  },
  {
    id: 'folder-7',
    name: 'AI-BD-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [],
  },
  {
    id: 'folder-8',
    name: 'AI-EPC-Docs',
    type: 'file',
    isFolder: true,
    isExpanded: false,
    children: [],
  },
];

export const mockSqlTables: TableItem[] = [
  { id: 'sql-1', name: 'aidataquery', schema: 'dbo', rowCount: 15420 },
  { id: 'sql-2', name: 'energy_production', schema: 'analytics', rowCount: 89234 },
  { id: 'sql-3', name: 'wind_farm_metrics', schema: 'operations', rowCount: 45123 },
  { id: 'sql-4', name: 'solar_panel_status', schema: 'operations', rowCount: 12890 },
  { id: 'sql-5', name: 'grid_distribution', schema: 'analytics', rowCount: 67432 },
];

export const mockD365Tables: TableItem[] = [
  { id: 'd365-1', name: 'Projects', schema: 'D365', rowCount: 234 },
  { id: 'd365-2', name: 'Vendors', schema: 'D365', rowCount: 1256 },
  { id: 'd365-3', name: 'Invoices', schema: 'D365', rowCount: 8934 },
  { id: 'd365-4', name: 'Assets', schema: 'D365', rowCount: 4521 },
];

export const modelOptions: ModelOption[] = [
  { id: 'private-llm', name: 'Private LLM', subtitle: 'GPT-4o', icon: 'shield' },
  { id: 'public-llm', name: 'Public LLM', subtitle: 'GPT-4o', icon: 'globe' },
  { id: 'deep-research', name: 'Deep Research', subtitle: 'O1', icon: 'search' },
  { id: 'thinking', name: 'Thinking', subtitle: 'GPT-5', icon: 'sparkles' },
  { id: 'web-search', name: 'Web Search', subtitle: 'Bing API', icon: 'globe-2' },
  { id: 'image-generation', name: 'Image Generation', subtitle: 'GPT-Image-1', icon: 'image' },
  { id: 'video-generation', name: 'Video Generation', subtitle: 'SORA', icon: 'video' },
];

export const sampleAIResponses = {
  default: `Based on my analysis of the attached documents, I've identified the following key insights:

**Project Overview:**
- **Project Name:** Offshore Wind Farm Phase II
- **Capacity:** 500 MW
- **Timeline:** Q2 2024 - Q4 2026
- **Estimated Capex:** $1.2 Billion

**Key Findings:**
1. The wind resource assessment indicates an average wind speed of 9.2 m/s at hub height
2. Environmental impact assessment has been completed and approved
3. Grid connection agreement is pending final approval

Would you like me to provide more detailed analysis on any specific aspect?`,
  
  thinking: `Let me analyze this step by step...

🔍 **Step 1: Document Analysis**
Reading through the wind farm specifications and extracting relevant data points...

🧮 **Step 2: Calculations**
Computing capacity factors and projected annual energy production...

📊 **Step 3: Comparison**
Cross-referencing with industry benchmarks and similar projects...

**Conclusion:**
The proposed offshore wind project shows promising returns with an estimated capacity factor of 45%, which is above the industry average of 38% for similar installations.`,
};
