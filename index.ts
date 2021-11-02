//Com base nas instruções do link, crie um um algoritmo em TS que receba nome, salário e horas extras quando houver (base de cálculo 200 horas mensais).
//O resultado no console desse programa deverá ser:
//Nome
//Valor salário bruto
//Valor total de horas extra
//Faixa de desconto do INSS
//Valor descontado para o INSS
//Faixa de desconto do IR
//Valor descontado para o IR
//Valor salário líquido (salário bruto - desconto INSS - desconto IR + horas extras)

//Dicas:
//Crie métodos separados para cada cálculo
//Crie uma interface que represente o objeto a ser retornado
//Crie logs de execução informando cada passo que o programa executa
//Verifique a ordem de descontos na folha de pagamento

interface Funcionario {
    
    s_bruto: number;
    h_e: number;
    fx_inss: number;
    desc_inss: number;
    fx_imp_rend: number;
    desc_ir: number;
    s_liquido: number
    nm_funcionario: string;
}

class Funcionario {
    funcionario: Funcionario;

    constructor (nm_funcionarioa: string, horaExtra: number,salario: number, ) {
        this.funcionario = {} as Funcionario;
        this.funcionario.nm_funcionario = nm_funcionarioa;
        this.funcionario.s_bruto = salario;
        this.funcionario.h_e = this.valor_h_e(salario, horaExtra);
        this.funcionario.fx_inss = this.fx_inss_fincionario(salario);
        this.funcionario.desc_inss = this.desc_inss_funcionario(salario, this.funcionario.fx_inss);
        this.funcionario.fx_imp_rend = this.fx_i_r_funcionario(salario);
        this.funcionario.desc_ir = this.valor_desc_ir_funcionario(salario, this.funcionario.fx_imp_rend, this.funcionario.desc_inss);
        this.funcionario.s_liquido = this.valor_liquido(salario, this.funcionario.desc_inss, this.funcionario.desc_ir, this.funcionario.h_e);
    }
    valor_liquido(salario: number, desc_inss: number, desc_ir: number, h_e: number): number {
        return salario - desc_inss - desc_ir + h_e;
    }

    valor_h_e(salario: number, horaExtra: number) : number {
        let resultado_h_e = salario / 200;
        resultado_h_e *= 1.5;
        resultado_h_e *= horaExtra;
        return resultado_h_e;
    }

    fx_inss_fincionario(salario: number): 
    number {
        let fx_desc = 7.5;
        if (salario > 1100 && salario <= 2203.48) {
            fx_desc = 9;
        } else if (salario > 2203.48 && salario <= 3305.22) {
            fx_desc = 12;
        } else if (salario > 3305.22) {
            fx_desc = 14;
        }
        return fx_desc;
    }

    desc_inss_funcionario(salario: number, fx_desc: number): 
    number {
        let vl_desc_inss = (salario * (fx_desc / 100));        
        return vl_desc_inss;
    }

    fx_i_r_funcionario(salario: number): 
    number {
        let fx_desc = 0;
        if (salario > 1903 && salario <= 2826) {
            fx_desc = 7.5;
        } else if (salario > 2827 && salario <= 3751) {
            fx_desc = 15.0;
        } else if (salario > 3752 && salario <= 4664) {
            fx_desc = 22.5;
        } else if (salario > 4665) {
            fx_desc = 27.5;
        } 
        return fx_desc;
    }

    valor_desc_ir_funcionario(salario: number, fx_desc: number, desc_inss: number): number {

        let vl_desc_inss = salario - desc_inss;

        vl_desc_inss *= (fx_desc / 100);

        let vl_tributo = 0;

            switch (fx_desc) {
                case 7.5:  vl_tributo = 142.80; break;
                case 15.0: vl_tributo = 354.80; break;
                case 22.5: vl_tributo = 636.13; break;
                case 27.5: vl_tributo = 869.36; break;
             }

        vl_desc_inss -= vl_tributo;
        return vl_desc_inss;
    }
}

let funcionario = new Funcionario(process.argv[2], Number(process.argv[3]), Number(process.argv[4]));
console.log(funcionario);