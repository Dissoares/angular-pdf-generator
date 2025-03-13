import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PdfService } from './pdf.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('contentToConvert', { static: true })
  contentToConvert!: ElementRef;

  public generatePDF() {
    const content = this.contentToConvert.nativeElement;
    console.log('content:', content);
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('documento.pdf');
    });
  }
  // public dadosPessoa = [
  //   {
  //     pessoa: [
  //       { id: 1, name: 'João Silva', email: 'joao@example.com', idade: 30 },
  //       {
  //         id: 2,
  //         name: 'Maria Oliveira',
  //         email: 'maria@example.com',
  //         idade: 40,
  //       },
  //       { id: 3, name: 'Pedro Souza', email: 'pedro@example.com', idade: 44 },
  //     ],
  //     endereco: [
  //       { id: 1, rua: 'rua vinsconde', numero: '23' },
  //       { id: 2, rua: 'Maria Oliveira', numero: '43' },
  //       { id: 3, rua: 'Pedro Souza', numero: '54' },
  //     ],
  //     vinculos: [
  //       { id: 1, cargo: 'Barman', salario: '1.8989' },
  //       { id: 2, cargo: 'Pintor', salario: '5.965' },
  //       { id: 3, cargo: 'Jogador', salario: '79.874' },
  //     ],
  //   },
  // ];

  // public textoCabecalho = 'Relatório de Usuários';
  // public textoRodape = 'Gerado por Angular PDF Generator';
  // public logoUrl =
  //   'https://images.freeimages.com/image/thumbs/a6e/dark-wolf-logo-triangle-png-art-5695593.png';

  // constructor(private pdfService: PdfService) {}

  // public gerarPdf() {
  //   this.pdfService.gerarPdf(
  //     this.dadosPessoa,
  //     this.textoCabecalho,
  //     this.textoRodape,
  //     this.logoUrl
  //   );
  // }
}
