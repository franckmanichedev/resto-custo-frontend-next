/** 
 * Ce fichier contient une fonction utilitaire pour la gestion des classes CSS conditionnelles.
 * La fonction `cn` utilise la bibliothèque `clsx` pour concaténer des classes CSS de manière propre et efficace.
 * Elle accepte un nombre variable d'arguments qui peuvent être des chaînes de caractères ou des valeurs falsy (false, null, undefined).
 * Les classes falsy seront automatiquement ignorées, ce qui facilite la gestion des classes conditionnelles dans les composants React.
*/
import clsx from 'clsx'

export const cn = (...inputs: Array<string | false | null | undefined>) => {
  return clsx(inputs)
}

export type Cn = typeof cn
