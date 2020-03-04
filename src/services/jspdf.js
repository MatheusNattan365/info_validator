import jsPDF from 'jspdf';


export default {
  gerarDoc() {

    let doc = new jsPDF()

    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setFontSize(12)
    doc.text(`DECLARAÇÃO DE IDONEIDADE DAS INFORMAÇÕES`, 50, 30)
    
    doc.setFontStyle("normal");
    doc.setFontSize(10)
    doc.text(`
        Declaro que li e respondi pessoalmente todas as questões contidas no presente 
    formulário e autorizo ser procedida averiguação dos endereços cotados, bem como as 
    pessoas e empresas mencionadas no presente a fornecerem à Polícia  Militar todas 
    as informações sobre minha conduta pessoal, profissional e escolar. Isentando-as de 
    responsabilidades caso não se processe o meu alistamento ou venha a ser desligado do 
    Curso de Formação.`, 30, 40)

    doc.setFontSize(8)
    doc.text(`____________________ ,  _______ de _____________ de _________.`, 80, 80)
    
    doc.setFontSize(8)
    doc.text(`________________________________________________`, 70, 100)
    doc.setFontSize(8)
    doc.text(`Assinatura do Candidato`, 90, 105)

    

  doc.save(`TERMO_DE_IDONEIDADE.pdf`)
}

}

