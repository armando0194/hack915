import { Observable } from 'rxjs';

export interface Camera {
  title: string;
  source: string;
  url: string;
  description: string;
}

export abstract class SecurityCamerasData {
  abstract getCamerasData(): Observable<Camera[]>;
}
