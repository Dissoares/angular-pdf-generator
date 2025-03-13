import { Injectable } from '@angular/core';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  public gerarPdf(
    dadosArray: any[],
    textoCabecalho: string,
    textoRodape: string,
    logoUrl: string
  ) {
    const doc = new jsPDF();

    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
    doc.setFontSize(18);
    doc.text(textoCabecalho, 50, 20);

    let startY = 40;

    dadosArray.forEach((item) => {
      autoTable(doc, {
        startY,
        head: [['ID', 'Nome', 'Email']],
        body: item.pessoa.map((pessoa: any) => [
          pessoa.id,
          pessoa.name,
          pessoa.email,
        ]),
      });

      startY = (doc as any).lastAutoTable.finalY + 10;
      autoTable(doc, {
        startY,
        head: [['ID', 'Rua', 'Número']],
        body: item.endereco.map((endereco: any) => [
          endereco.id,
          endereco.rua,
          endereco.numero,
        ]),
      });

      startY = (doc as any).lastAutoTable.finalY + 10;
      autoTable(doc, {
        startY,
        head: [['ID', 'Cargo', 'Salário']],
        body: item.vinculos.map((vinculo: any) => [
          vinculo.id,
          vinculo.cargo,
          vinculo.salario,
        ]),
      });

      startY = (doc as any).lastAutoTable.finalY + 20;
    });

    const contadorDePaginas = doc.getNumberOfPages();
    for (let i = 1; i <= contadorDePaginas; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(textoRodape, 10, doc.internal.pageSize.height - 10);
      doc.text(
        `Página ${i} de ${contadorDePaginas}`,
        doc.internal.pageSize.width - 50,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save('relatorio.pdf');
  }
}
