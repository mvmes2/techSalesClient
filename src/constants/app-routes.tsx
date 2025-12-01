export const APP_ROUTES = {
    private: {
        userHome: {
            name: '/user-home'
        },
        Estoque: {
            name: '/estoque'
        },
        CadastroCliente: {
            name: '/clientes'
        },
        Cliente: {
            name: '/clientes/:id'
        },
        Config: {
            name: '/config'
        }
    },
    public: {
        home: '/',
        forget_password: '/recover-pass/:id'
    }
};