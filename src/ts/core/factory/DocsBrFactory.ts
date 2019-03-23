Core.factory("DocsBrFactory", DocsBrFactory);

// DI
DocsBrFactory.$inject = ["$log"];

/**
 * Validação e formatação para:
 * - CPF;
 * - CNPJ;
 * - PIS;
 * 
 * @param {angular.ILogService} $log 
 *     Serviço de logs nativo do AngularJS
 * @returns {*}
 * @constructor
 */
function DocsBrFactory($log: angular.ILogService): any {
  /**
   * Expressões regulares para validação e sanitização de documentos.
   * 
   * @type {any}
   */
  const _patterns: any = {
    digits: /\D/g,
    cpf: /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g,
    cnpj: /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g,
    pis: /([0-9]{3})([0-9]{5})([0-9]{2})([0-9]{1})/g
  };

  // Helpers
  // --------------------------------------------------------------------

  /**
   * Verifica se uma string é composta, exclusivamente, por dígitos repetidos.
   * 
   * @param {string|number} value 
   *     Valor a ser validado 
   * @param {number} length 
   *     Comprimento da string desejada para validação
   * @returns {boolean}
   * @private 
   */
  const _checkRepetitions = function (
    value: string|number, 
    length?: number
  ): boolean {
    if (typeof value === "number") value = value.toString();
    length = length || 11;
    for (let i = 0; i < 10; i++) {
      let _rgx = new RegExp(`^${i}{${length}}$`, "g");
      if (value.match(_rgx) !== null) return false;
    }
    return true;
  }

  /**
   * Adiciona zeros à esquerda ou direita de um número ou string.
   * 
   * @param {string|number} value 
   *     Valor a ser modificado
   * @param {number} length 
   *     Comprimento desejado para o retorno 
   * @param {boolean} right 
   *     Se devem ser adicionados à direita 
   * @returns {string}
   * @private 
   */
  const _paddedZeroes = function (
    value: number|string,
    length?: number,
    right?: boolean
  ): string {
    if (typeof value === "number") value = value.toString();
    if (value.length < (length || 11)) {
      while (value.length < (length || 11)) {
        value = (right) ? value + "0" : "0" + value;
      }
    }
    return value;
  }

  /**
   * Limpa uma string ou número, removendo caracteres inválidos e deixando 
   * apenas os dígitos.
   * 
   * Se o valor for `null`, `undefined` ou vazio, retorna `false`.
   * 
   * @param {string|number} value 
   *     String/número a ser sanitizado
   * @returns {string|boolean}
   * @private
   */
  const _toDigits = function (value: string|number): string|boolean {
    if (typeof value === "number") value = value.toString();
    if (value === null || value === undefined || value.trim() === "") {
      return false;
    }
    value.replace(_patterns.digits, "");
    return value;
  }

  // Formatadores
  // --------------------------------------------------------------------

  /**
   * Formata CNPJ.
   * 
   * Se inválido, retorna `false`.
   *
   * @param {string|number} cnpj 
   *     Número a ser formatado 
   * @return {string|boolean}
   * @private
   */
  const _cnpjFormat = function(cnpj: string|number): string|boolean {
    let digits: any = _toDigits(cnpj);
    if (!digits) return false;
    if (digits.length > 14) return false;
    if (digits.length < 14) digits = _paddedZeroes(digits, 14);
    return digits.replace(
      _patterns.cnpj,
      "$1.$2.$3/$4-$5"
    );
  };

  /**
   * Formata CPF.
   * 
   * Se inválido, retorna `false`.
   *
   * @param {string|number} cpf
   *     Número a ser formatado 
   * @return {string|boolean}
   * @private
   */
  const _cpfFormat = function(cpf: string|number): string|boolean {
    let digits: any = _toDigits(cpf);
    if (!digits) return false;
    if (digits.length > 11) return false;
    if (digits.length < 11) digits = _paddedZeroes(digits, 11);
    return digits.replace(
      _patterns.cpf,
      "$1.$2.$3-$4"
    );
  };

  /**
   * Formata PIS/PASEP.
   *
   * @param {string|number} pis
   *     Número a ser formatado 
   * @return {string|boolean}
   * @private
   */
  const _pisFormat = function(pis: string|number): string|boolean {
    let digits: any = _toDigits(pis);
    if (!digits) return false;
    if (digits.length > 11) return false;
    if (digits.length < 11) digits = _paddedZeroes(digits, 11);
    return digits.replace(
      _patterns.pis,
      "$1.$2.$3-$4"
    );
  };

  // Validadores
  // --------------------------------------------------------------------

  /**
   * Valida CNPJ.
   *
   * @param {string|number} cnpj 
   *     Número a ser validado
   * @return {boolean}
   * @private
   */
  const _cnpjValidate = function(cnpj: string|number): boolean {
    let digits: any = _toDigits(cnpj);

    if (!digits) return false;

    if (digits.length > 14) return false;
    if (digits.length < 14) digits = _paddedZeroes(digits, 14);
    
    if (!_checkRepetitions(digits, 14)) return false;

    let sum: number, 
        val: number;

    // Dígito 1
    sum = 0;
    val = 5;
    for (let l = 0; l < 12; l++) {
      sum += parseInt(digits[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (digits[12] !== val.toString()) return false;

    // Dígito 2
    sum = 0;
    val = 6;
    for (let l = 0; l < 13; l++) {
      sum += parseInt(digits[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    return (digits[13] === val.toString());
  };

  /**
   * Valida CPF.
   *
   * @param {string|number} cpf
   *     Número a ser validado
   * @return {boolean}
   * @private
   */
  const _cpfValidate = function(cpf: string|number): boolean {
    let digits: any = _toDigits(cpf);

    if (!digits) return false;

    if (digits.length > 11) return false;
    if (digits.length < 11) digits = _paddedZeroes(digits, 11);

    if (!_checkRepetitions(digits, 11)) return false;

    let sum: number, 
        val: number;

    // Dígito 1
    sum = 0;
    for (let l = 0; l < 9; l++) {
      sum += parseInt(digits[l]) * (10 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    if (digits[9] !== val.toString()) return false;

    // Dígito 2
    sum = 0;
    for (let l = 0; l < 10; l++) {
      sum += parseInt(digits[l]) * (11 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    return (digits[10] === val.toString());
  };

  /**
   * Valida PIS/PASEP.
   *
   * @param {string|number} pis
   *     Número a ser validado
   * @return {boolean}
   * @private
   */
  const _pisValidate = function(pis: string|number): boolean {
    let digits: any = _toDigits(pis);

    if (!digits) return false;
    
    if (digits.length > 11) return false;
    if (digits.length < 11) digits = _paddedZeroes(digits, 11);

    if (!_checkRepetitions(digits, 11)) return false;

    let sum: number, 
        val: number, 
        multiplier: number;

    multiplier = 3;
    sum = 0;

    for (let l = 0; l < 10; l++) {
      sum += multiplier * digits[l];

      multiplier -= 1;
      if (multiplier === 1) multiplier = 9;
    }

    val = 11 - (sum % 11);
    val = (val === 10 || val === 11) ? 0 : val;

    return (digits[10] === val.toString());
  };
  
  return {
    cnpj: {
      format: _cnpjFormat,
      validate: _cnpjValidate
    },
    cpf: {
      format: _cpfFormat,
      validate: _cpfValidate
    },
    pis: {
      format: _pisFormat,
      validate: _pisValidate
    }
  };
}
