/**
 * Global/Utils
 * ----------------------------------------------------------------------
 * @since   0.0.1
 */
class Utils {
  /**
   * Dicionário contendo strings e outros valores utilitários.
   * 
   * @type {Object}
   */
  static dictionary: any = {
    /**
     * Armazena strings para sanitização de valores.
     *
     * @type {Object}
     */
    accent: {
      source: "ÁÀÄÂÃÅÉÈÊËÍÌÎÏÓÒÔÕØÚÙÛÜÝÇÑáàäâãåéèêëíìîïóòôõøúùûüýÿçñ$&@°ºª¥£¢μ§",
      clean: "AAAAAAEEEEIIIIOOOOOUUUUYCNaaaaaaeeeeiiiiooooouuuuyycnseaooaylcus"
    }
  };

  /**
   * Realiza um merge + substituição de objetos, similar à Object.assign.
   *
   * @param {...*} args
   *    Um ou mais objeto, separado por vírgulas, para merging
   * @returns {Object}
   */
  static merge (): object {
    if (arguments.length > 0) {
      let mainArgument:object = {};

      for (let i = 0; i < arguments.length; i++) {
        let keys: Array<string> = Object.keys(arguments[i]);

        for (let k in keys) {
          mainArgument[keys[k]] = arguments[i][keys[k]];
        }
      }

      return mainArgument;
    }

    return {};
  }

  /**
   * Implementação standalone de `jQuery.param()`, usado para serializar
   * dados para envio.
   *
   * Original em:
   * https://github.com/knowledgecode/jquery-param/blob/master/jquery-param.js
   *
   * @param {Object} toSerialize
   *     Objeto para serialização
   * @returns {String}
   */
  static params (toSerialize: object): string {
    /**
     * Armazenará dados para serializar.
     *
     * @type {Array}
     */
    let _serialize: Array<any> = [];

    /**
     * Adiciona valores para o array do serializador.
     *
     * @param {String|Number} key
     *    Chave para definir no serializado
     * @param {any} val
     *    Valor para serializar/definir
     */
    let add = function (key: string, val: any) {
      // Se função, executa e usa o valor
      val = (typeof val === "function") ? val() : val;
      val = (val === null || val === undefined) ? '' : val;
      _serialize[_serialize.length] = encodeURIComponent(key)
        + '='
        + encodeURIComponent(val);
    };

    /**
     * Serializa os parâmetros do objeto em uma string URL encoded.
     *
     * @param {String} prefix
     *     Prefixo do objeto para hash map
     * @param {any} obj
     *     Objeto a ser serializado
     * @returns {Array}
     */
    let buildParam = function (prefix: string, obj: any): Array<any> {
      let i: number, 
          len: number, 
          key: string;

      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            buildParam(
              prefix + "[" + ((typeof obj[i] === 'object' && obj[i]) ? i : '') + "]",
              obj[i]
            );
          }
        } else if (String(obj) === "[object Object]") {
          for (key in obj) {
            buildParam(prefix + "[" + key + "]", obj[key]);
          }
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value);
        }
      } else {
        for (key in obj) {
          buildParam(key, obj[key]);
        }
      }

      return _serialize;
    };

    return buildParam('', toSerialize).join('&');
  }

  /**
   * Limpa acentuação em uma string.
   *
   * @param {string} val
   *     String a ser limpa
   * @return {string}
   */
  static sanitizeAccents (val: string): string {
    for (let i = 0; i < Utils.dictionary.accent.source.length; i++) {
      val = val.replace(
        Utils.dictionary.accent.source[i],
        Utils.dictionary.accent.clean[i]
      );
    }

    return val
      .replace("ß", "ss")
      .replace(/^-+|-+$/g, "");
  }
}
