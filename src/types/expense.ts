export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  currency: string;
  status: ExpenseStatus;
  attachments?: string[];
  tags?: string[];
  location?: string;
}

export enum ExpenseCategory {
  TRAVEL = 'Travel',
  ACCOMMODATION = 'Accommodation',
  FOOD = 'Food',
  TRANSPORTATION = 'Transportation',
  ENTERTAINMENT = 'Entertainment',
  BUSINESS = 'Business',
  OTHER = 'Other',
}

export enum ExpenseStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  REIMBURSED = 'Reimbursed',
}

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory;
  status?: ExpenseStatus;
  minAmount?: number;
  maxAmount?: number;
} 