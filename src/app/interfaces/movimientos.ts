export interface Movimientos {
  id?: number;
  voluntario_id: number;
  tipo?: string;
  cantidad: number;
  fecha?: string | Date;
  descripcion: string;
}
