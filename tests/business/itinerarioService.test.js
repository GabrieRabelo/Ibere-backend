const itinerarioService = require('../../src/business/itinerario/itinerarioService');
const itinerarioRepository = require('../../src/infrastructure/itinerario/itinerarioRepository');
const {itinerarioCompleto,
       itinerarioSemInstituicoes
} = require('../mocks/itinerarioMock');

describe('Teste buscar dados de itinerario', () => {
    it("Retorna todos os itinerarios do banco", async () => {
        jest.spyOn(itinerarioRepository, 'buscarItinerarios').mockResolvedValue([itinerarioCompleto]);

        return expect(itinerarioService.buscarItinerarios()).resolves.toEqual([itinerarioCompleto]);
    });

    it("Testa exception Resultado Vazio", async () => {
        jest.spyOn(itinerarioRepository, 'buscarItinerarios').mockResolvedValue([]);

        return expect(itinerarioService.buscarItinerarios()).rejects.toThrow('Não foi encontrado nenhum valor de itinerario');
    });
});

describe('Testes Salvar Itinerario', () => {
    it("Salva Itinerario com todos parametros", async () => {
        jest.spyOn(itinerarioRepository, 'salvarItinerario').mockImplementation().mockResolvedValue();
        return itinerarioRepository.salvarItinerario(itinerarioCompleto).then(() => {
            expect(itinerarioRepository.salvarItinerario).toHaveBeenCalledWith(itinerarioCompleto);
        });
    });

    it("Salva Itinerario sem lista de instituicoes", async () => {
        jest.spyOn(itinerarioRepository, 'salvarItinerario').mockImplementation().mockResolvedValue();
        return expect(itinerarioService.salvarItinerario(itinerarioSemInstituicoes)).rejects.toThrow('Não é possivel criar um itinerário sem instituições!');
    });

});
