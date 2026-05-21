export type RegisterChoice = 'independent' | 'franchise' | 'team'

export type IndependentRegisterStep = 'account' | 'restaurant' | 'branch' | 'review' | 'verify'

export type FranchiseRegisterStep = 'account' | 'company' | 'scale' | 'preview' | 'verify'

export interface IndependentRegisterData {
  // Step 1: Account
  fullname: string
  email: string
  password: string
  confirmPassword: string

  // Step 2: Restaurant
  organizationName: string
  cuisineType: string
  country: string
  city: string
  currency: string

  // Step 3: Branch
  branchName: string
  branchAddress: string
  branchPhone: string
}

export interface FranchiseRegisterData {
  // Step 1: Owner account
  fullname: string
  email: string
  password: string
  confirmPassword: string

  // Step 2: Company information
  companyName: string
  companyWebsite?: string
  companyPhone: string

  // Step 3: Business scale
  expectedBranches: string
  estimatedEmployees: string

  // Step 4: Subscription plan (preview)
  plan: 'starter' | 'professional' | 'enterprise'
}

export type RegisterFormData = IndependentRegisterData | FranchiseRegisterData
