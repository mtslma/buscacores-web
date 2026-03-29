export interface User {
  id: number;
  username: string;
}

export interface Palette {
  id: number;
  name: string;
  likesCount: number;
  createdAt: string;
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  fourthColor: string;
  fifthColor: string;
  user: User;
  isPublic: boolean;
  isLiked: boolean;
}

export interface PaletteResponse {
  content: Palette[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface ColorSchemeRequest {
  name: string;
  hex: string;
  isPublic: boolean;
}
