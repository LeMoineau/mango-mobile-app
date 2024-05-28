import { isUUID, UUID } from "../primitives/Identifiers";

export interface Identified {
  id: UUID;
}

/**
 * TYPES FUNCTION
 */

export function isIdentified(ident: any): ident is Identified {
  return ident && ident.id && isUUID(ident.id);
}
