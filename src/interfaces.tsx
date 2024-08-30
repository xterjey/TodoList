export interface Task {
  title: string;
  dir: string;
  url: string;
  date?: string;
  completed: boolean;
  important: boolean;
  id: string;
  timer?: number;
  discord?: string;   // Tautan Discord opsional
  twitter?: string;   // Tautan Twitter opsional
  telegram?: string;  // Tautan Telegram opsional
  blockchain?: string; // Informasi terkait blockchain opsional
  wallet?: string;    // Informasi dompet blockchain opsional
}
