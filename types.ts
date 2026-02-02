
export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ReportResult {
  id: string;
  certificateNo?: string;
  stoneName?: string;
  stoneType: string; // Acts as Species/Group
  weight: string;
  shapeCut?: string;
  color: string;
  dimensions?: string;
  refractiveIndex?: string;
  specificGravity?: string;
  hardness?: string;
  comments?: string;
  issuedTo?: string;
  issueDate: string;
  imageUrl?: string;
  verificationStatus: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
