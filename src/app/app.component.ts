import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PdfService } from './pdf.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
    { id: 3, name: 'Pedro Souza', email: 'pedro@example.com' },
  ];

  headerText = 'Relatório de Usuários';
  footerText = 'Gerado por Angular PDF Generator';
  logoUrl =
    'https://images.freeimages.com/image/thumbs/a6e/dark-wolf-logo-triangle-png-art-5695593.png';

  constructor(private pdfService: PdfService) {}

  generatePdf() {
    this.pdfService.generatePdf(
      this.data,
      this.headerText,
      this.footerText,
      this.logoUrl
    );
  }
}
