import {
  serverTimestamp,
  type FirestoreDataConverter,
  type DocumentData,
  type QueryDocumentSnapshot,
  type SnapshotOptions
} from 'firebase/firestore'
import type {
  Organization,
  Branch,
  OrganizationMembership,
  BranchMembership,
  Invitation,
  UserProfile,
  RoleDefinition
} from './firestore-schema'

const buildConverter = <T extends DocumentData>():
  FirestoreDataConverter<T & { id: string }> => ({
  toFirestore(value) {
    const { id, ...data } = value
    return {
      ...data,
      updatedAt: serverTimestamp(),
      ...(value.createdAt ? { createdAt: value.createdAt } : {})
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<T>, options?: SnapshotOptions) {
    return {
      id: snapshot.id,
      ...(snapshot.data(options) as T)
    } as T & { id: string }
  }
})

export const organizationConverter = buildConverter<Organization>()
export const branchConverter = buildConverter<Branch>()
export const organizationMembershipConverter = buildConverter<OrganizationMembership>()
export const branchMembershipConverter = buildConverter<BranchMembership>()
export const invitationConverter = buildConverter<Invitation>()
export const userProfileConverter = buildConverter<UserProfile>()
export const roleDefinitionConverter = buildConverter<RoleDefinition>()
