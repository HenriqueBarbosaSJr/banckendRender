const knex =  require('../database/index');

module.exports={

    
    async prods(req, res){
        try{

            const result = await knex('produtos');
            const qtdaRegistros = result.length;

            return res.json({
                            'Quantidade de Registros ':qtdaRegistros,
                             result});        

        }catch(error){
            return res.status(400).json({error: error.message});
        };
    },

    async prodsAppInventor(req, res){
        try{

            const result = await knex.select('cod', 'nome', 'qtda').from('produtos');
            return res.json(result);        

        }catch(error){
            return res.status(400).json({error: error.message});
        };
    },

    async searchName(req, res){
        try {
            const { nome } = req.params;
            const results = await knex('produtos')
               .where('nome', 'like', '%' + nome + '%');
            return res.json(results);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }

    },

    async searchCod(req, res){
        try {
            const { nome } = req.params;
            const results = await knex('produtos')
               .where('nome', 'like', '%' + nome + '%');
            return res.json(results);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }

    },

    async createProd(req, res) {
        try{
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { fabricante } = req.body;
            const { custo } = req.body;
            const { preco} = req.body;
            
            await knex('produtos').insert({
                nome,
                descri,
                qtda,
                fabricante,
                preco,
                custo
            });
            return res.status(201).send();
        }catch(error){
            return res.status(400).json({error: error.message});
        };
    },

    async updateProd(req, res){
        try{
            const { cod } = req.params;
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { fabricante } = req.body;
            const { custo } = req.body;
            const { preco} = req.body;
            await knex('produtos').update({
                nome,
                descri,
                qtda,
                fabricante,
                preco,
                custo
            }).where({ cod });
            return res.status(201).send();
        }catch(error){
            return res.status(400).json({error: error.message});
        };
    },

    async deleteProd(req, res){
        try {
            const { cod } = req.params;
            await knex('produtos')
            .where({ cod })
            .del();
            return res.status(201).send({msg : 'Registro deletado!'});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
        
    }

}