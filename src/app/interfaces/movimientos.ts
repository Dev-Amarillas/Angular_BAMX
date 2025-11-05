export interface Movimientos {
  id?: number;
  voluntario_id: number;
  tipo?: string;
  cantidad: number;
  fecha?: Date | string;
  descripcion: string;
}
