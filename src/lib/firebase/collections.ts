import {
  collection,
  doc,
  type CollectionReference,
  type DocumentReference,
  type FirestoreDataConverter
} from 'firebase/firestore'
import { db } from './firebase'
import {
  branchConverter,
  branchMembershipConverter,
  invitationConverter,
  organizationConverter,
  organizationMembershipConverter,
  roleDefinitionConverter,
  userProfileConverter
} from './firestore-converters'
import type {
  Branch,
  BranchMembership,
  Invitation,
  Organization,
  OrganizationMembership,
  RoleDefinition,
  UserProfile
} from './firestore-schema'

export const organizationsCollection = (): CollectionReference<Organization> =>
  collection(db, 'organizations').withConverter(organizationConverter)

export const organizationDoc = (organizationId: string): DocumentReference<Organization> =>
  doc(db, 'organizations', organizationId).withConverter(organizationConverter)

export const branchesCollection = (organizationId: string): CollectionReference<Branch> =>
  collection(db, 'organizations', organizationId, 'branches').withConverter(branchConverter)

export const branchDoc = (organizationId: string, branchId: string): DocumentReference<Branch> =>
  doc(db, 'organizations', organizationId, 'branches', branchId).withConverter(branchConverter)

export const usersCollection = (): CollectionReference<UserProfile> =>
  collection(db, 'users').withConverter(userProfileConverter)

export const userDoc = (userId: string): DocumentReference<UserProfile> =>
  doc(db, 'users', userId).withConverter(userProfileConverter)

export const membershipsCollection = (): CollectionReference<OrganizationMembership | BranchMembership> =>
  collection(db, 'memberships').withConverter(organizationMembershipConverter as unknown as FirestoreDataConverter<OrganizationMembership | BranchMembership>)

export const invitationsCollection = (): CollectionReference<Invitation> =>
  collection(db, 'invitations').withConverter(invitationConverter)

export const roleDefinitionsCollection = (): CollectionReference<RoleDefinition> =>
  collection(db, 'roles').withConverter(roleDefinitionConverter)
