import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [MatListModule, MatButtonModule, CommonModule],
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss'],
})
export class PdfGeneratorComponent implements OnInit {
  data = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
    { id: 3, name: 'Pedro Souza', email: 'pedro@example.com' },
  ];

  headerText = 'Relatório de Usuários';
  footerText = 'Gerado por Angular PDF Generator';
  logoUrl = 'assets/logo.png';

  constructor(private pdfService: PdfService) {}

  ngOnInit() {}

  public gerarPdf() {
    this.pdfService.gerarPdf(
      this.data,
      this.headerText,
      this.footerText,
      this.logoUrl
    );
  }
}
