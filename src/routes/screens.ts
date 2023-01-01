export const AUTH_SCREENS = {
    Login: "auth.Login",
    EsqueciMinhaSenha: "auth.EsqueciMinhaSenha",
    RedefinirSenha: "auth.RedefinirSenha",
    RequisicaoPermissoes: "auth.RequisicaoPermissoes",

    Clientes: "auth.Clientes",
}

export const APP_SCREENS = {
    Tanques: "app.Tanques",
    Abastecimentos: "app.Abastecimentos",
    CadastroAbastecimento: "app.CadastroAbastecimento",
    Clientes: "app.Clientes",

    Menu: "app.Menu",
    AlterarSenha: "app.AlterarSenha",
    Permissoes: "app.Permissoes",

    
};

export function obterNomeDaRota(tela: string) {
    return Object.keys(AUTH_SCREENS).some(nome => nome.toUpperCase() === tela.toUpperCase()) ?
        "auth" :
        "app";
}