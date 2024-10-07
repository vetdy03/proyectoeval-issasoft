<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Socio_empresa;
use App\Services\EmpresaService;
class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empresa=Empresa::all();
        return response()->json(['contenido'=>compact('empresa')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        

        try{
            $request->validate([
                'nombre_corto'=>'required|max:64|unique:empresas',
                'nombre_largo'=>'required|max:128|unique:empresas',
                'telefono'=>'required|max:64',
                'correo'=>'required|max:64',
                'id_usuario'=>'required|integer|unique:socio_empresas',
                'imagen' => [
                    'required',
                    'string'
                ],
            ]);
            $socio_empresa = new Socio_empresa();
            $socio_empresa->id_usuario = $request->input('id_usuario');
            $socio_empresa->save();
// Crear Empresa
            $empresa = new Empresa();
            $empresaService=new EmpresaService();
            $archivo=$request->input('imagen');
            $rutaPublica=$empresaService->storeImage($archivo,$request->input('nombre_corto'),null);
            if ($rutaPublica){
                $empresa->url_logo = $rutaPublica;
            }else{
                return response()->json(['contenido'=>'no se pudo guardar la imagen'],422);
            }
        
            
            $empresa->nombre_corto = $request->input('nombre_corto');
            $empresa->nombre_largo = $request->input('nombre_largo');
            $empresa->telefono = $request->input('telefono');
            $empresa->correo= $request->input('correo');
            $empresa->id_representante_legal = $socio_empresa->id; 
            $empresa->save();


            
            $empresa->save();
            $socio_empresa->id_empresa = $empresa->id;
            $socio_empresa->save();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()],422);
        }
        
        return response()->json(['contenido'=>'se registro la empresa con exito'],200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $empresa=Empresa::find($id);
        return response()->json(['contendido'=>compact('empresa')],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_corto'=>'nullable|max:64|unique:empresa',
            'nombre_largo'=>'nullable|max:64|unique:empresa',
            'telefono'=>'nullable|max:64',
            'correo'=>'nullable|max:64',
            'url_logo'=>'nullable|max:64',
        ]);
        $empresa=Empresa::find($id);
        if ($empresa){
            $empresa->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la empresa con exito'],200);
        }else{
            return response()->json(['contenido'=>'no se encontro el id'],404);
        }   
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empresa=Empresa::find($id);
        if ($empresa){
            $empresa->delete();
            return response()->json(['contenido'=>'se elimino con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la empresa'],404);
        }
    }


   
}