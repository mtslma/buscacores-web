import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowBigDown,
  Code,
  Forward,
  Github,
  Globe,
  Layers,
  Layout,
  LucideAngularModule,
  Server,
} from 'lucide-angular';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './welcome.html',
})
export class Welcome {
  protected readonly icons = {
    foward: Forward,
    github: Github,
    globe: Globe,
    code: Code,
    layers: Layers,
    layout: Layout,
    server: Server,
    arrowDown: ArrowBigDown,
  };
}
