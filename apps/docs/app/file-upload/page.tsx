"use client"

import { FileUpload } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function FileUploadPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>FileUpload</DocTitle>
        <DocSubtitle>Zona drag & drop para subir archivos con preview, validación de tamaño y tipos.</DocSubtitle>
      </div>

      <DocInstall component="file-upload" />
      <DocDivider />

      <DocSection title="Básico">
        <FileUpload
          multiple
          maxSizeMb={5}
          helperText="Sube los documentos necesarios para tu perfil."
          onChange={files => console.log(files)}
        />
      </DocSection>

      <DocSection title="Solo imágenes">
        <FileUpload
          accept="image/*"
          maxSizeMb={2}
          label="Arrastra tu foto aquí o"
          helperText="PNG, JPG, WEBP · Máx. 2 MB"
        />
      </DocSection>

      <DocSection title="Archivo único">
        <FileUpload
          accept=".pdf,.docx"
          maxSizeMb={10}
          label="Adjunta tu CV o"
          helperText="PDF o DOCX · Máx. 10 MB"
        />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { FileUpload } from "@nuvo-ui/ui"

<FileUpload
  multiple
  accept="image/*"
  maxSizeMb={5}
  maxFiles={10}
  label="Arrastra archivos aquí o"
  helperText="PNG, JPG · Máx. 5 MB"
  onChange={(files) => {
    // files: FileUploadFile[] — { file: File, id: string, error?: string }
    const valid = files.filter(f => !f.error)
    console.log(valid.map(f => f.file))
  }}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "accept",      type: "string",    default: "—",     description: "Tipos aceptados, ej. 'image/*' o '.pdf,.docx'" },
          { name: "multiple",    type: "boolean",   default: "false",  description: "Permite seleccionar múltiples archivos" },
          { name: "maxSizeMb",   type: "number",    default: "5",      description: "Tamaño máximo por archivo en MB" },
          { name: "maxFiles",    type: "number",    default: "10",     description: "Número máximo de archivos" },
          { name: "label",       type: "string",    default: '"Arrastra archivos aquí o"', description: "Texto del drop zone" },
          { name: "helperText",  type: "string",    default: "—",     description: "Texto de ayuda debajo del drop zone" },
          { name: "disabled",    type: "boolean",   default: "false",  description: "Deshabilita el componente" },
          { name: "onChange",    type: "(files: FileUploadFile[]) => void", default: "—", description: "Callback con todos los archivos actuales" },
        ]} />
      </DocSection>
    </div>
  )
}
