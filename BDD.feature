Feature: Registro de transferência
  Scenario: Transferência sem a data de vencimento
    Given que realizei uma request de transferência
    When for verificado se todos os dados estão corretos
    And não possui uma data de vencimento
    Then deve ser feita uma request para o serviço de liquidação do banco
    And uma resposta de sucesso deve ser retornada

  Scenario: Transferência com data de vencimento
    Given que realizo uma request de transferência
    When for verificado que a 'data de vencimento' é <vencimento> que a 'data atual'
    Then uma 'resposta' de <resposta> e um 'status code' de <status_code> devem ser retornados
    Examples:
      | vencimento | resposta | status_code |
      | menor      | erro     |         405 |
      | maior      | sucesso  |         201 |


  # Scenario: Transferência com data de liquidação
  #   Examples:
  #       | data de liquidação |  Header 3 |
  #       | passada            |  Value 3  |
  #       | presente           |  Value 3  |
  #       | futuro             |  Value 3  |

Feature: Listagem de transferências
  Scenario: Retornar uma transferência
    Given que realizei uma request de listagem de transferência
    And passei na url um 'internalId' <status cadastro> no banco
    Then uma 'resposta' de <resposta> com o 'status code' <status_code> devem ser retornados
    And o payload <payload>
    Examples:
      | status cadastro | resposta | status_code | payload         |
      | não cadastrado  | sucesso  |        200  | a transferência |
      | cadastrado      | sucesso  |        500  | vazio           |