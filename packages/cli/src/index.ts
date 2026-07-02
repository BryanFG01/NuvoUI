#!/usr/bin/env node
import { Command } from "commander"
import { initCommand } from "./commands/init"
import { addCommand } from "./commands/add"

const program = new Command()

program
  .name("nuvo-ui")
  .description("CLI para agregar componentes de nuvo-ui a tu proyecto")
  .version("0.1.0")

program
  .command("init")
  .description("Inicializa nuvo-ui en tu proyecto (crea nuvo-ui.json)")
  .action(initCommand)

program
  .command("add")
  .description("Agrega uno o más componentes a tu proyecto")
  .argument("<components...>", "Nombres de los componentes: button, data-table, sidebar...")
  .action(addCommand)

program.parse()
