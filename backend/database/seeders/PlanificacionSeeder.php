<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('planificaciones')->insert([
            [
                'titulo'=>'presencial',
                'fecha_inicio'=>'2024/10/28',
                'fecha_fin'=>'2019/11/6',
                'dia_revision'=>'2024/10/27',
                'hora_revision'=>'11:00',
                'id_proyecto_empresa'=>'2'
            ],
            [
                'titulo'=>'plan 1',
                'fecha_inicio'=>'2024/10/29',
                'fecha_fin'=>'2019/11/7',
                'dia_revision'=>'2024/10/28',
                'hora_revision'=>'11:30',
                'id_proyecto_empresa'=>'1'
            ],
            [
                'titulo'=>'plan 2',
                'dia_revision'=>'2024/10/27',
                'hora_revision'=>'12:00',
                'fecha_inicio'=>'2024/11/1',
                'fecha_fin'=>'2019/11/8',
                'id_proyecto_empresa'=>'1'
            ],

        ]);
        DB::table('item_planificacion')->insert([
            [
                'nombre'=>'product backlog',
                'id_planificacion'=>'2'
            ],
            [
                'nombre'=>'sprint backlog',
                'id_planificacion'=>'1'
            ],
            [
                'nombre'=>'historia de usuario',
                'id_planificacion'=>'2'
            ],
        ]);
    
    }
}
