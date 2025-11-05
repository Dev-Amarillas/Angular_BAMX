export interface Asignaciones {
    id: number;
    voluntario_id: number;
    area_id: number;
    fecha_asignacion?: Date; // ← ahora opcional
    estado: boolean;
}
