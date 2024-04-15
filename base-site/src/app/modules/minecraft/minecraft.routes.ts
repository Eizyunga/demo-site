import { MinecraftPageComponent } from "./components/minecraft-page/minecraft-page.component";

export const minecraftRoutes = [
  { path: 'mcft', redirectTo: 'minecraft', pathMatch: 'full'},
  { path: 'minecraft', component: MinecraftPageComponent }
]
