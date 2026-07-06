"use client"

import * as React from "react"
import { Section } from "./types"
import { useUsers } from "./hooks/useUsers"
import { Sidebar } from "./components/Sidebar"
import { TopHeader } from "./components/TopHeader"
import { UserFormModal } from "./components/UserFormModal"
import { DeleteModal } from "./components/DeleteModal"
import { DashboardSection } from "./components/sections/DashboardSection"
import { UsuariosSection } from "./components/sections/UsuariosSection"
import { AnaliticasSection } from "./components/sections/AnaliticasSection"
import { RolesSection } from "./components/sections/RolesSection"

export default function CrudPage() {
  const [section,   setSection]   = React.useState<Section>("dashboard")
  const [collapsed, setCollapsed] = React.useState(false)
  const {
    users, filtered, stats,
    filters, setFilters,
    form, setForm, errors,
    editing, toDelete,
    formOpen, setFormOpen,
    deleteOpen, setDeleteOpen, setToDelete,
    openCreate, openEdit, handleSave, handleDelete, toggleStatus, exportCSV,
  } = useUsers()

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        section={section}
        onNavigate={setSection}
        userCount={users.length}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(c => !c)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader
          section={section}
          onNewUser={openCreate}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {section === "dashboard" && (
            <DashboardSection
              stats={stats}
              users={users}
              onNavigateToUsers={() => setSection("usuarios")}
            />
          )}
          {section === "usuarios" && (
            <UsuariosSection
              users={users}
              filtered={filtered}
              filters={filters}
              onFilterChange={setFilters}
              onEdit={openEdit}
              onDelete={u => { setToDelete(u); setDeleteOpen(true) }}
              onToggleStatus={toggleStatus}
              onNewUser={openCreate}
              onExportCSV={exportCSV}
            />
          )}
          {section === "analiticas" && (
            <AnaliticasSection stats={stats} />
          )}
          {section === "roles" && (
            <RolesSection users={users} />
          )}
        </main>
      </div>

      <UserFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        form={form}
        setForm={setForm}
        errors={errors}
        onSave={handleSave}
      />

      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={toDelete}
        onDelete={handleDelete}
      />
    </div>
  )
}
