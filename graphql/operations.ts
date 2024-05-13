import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilter>;
};

export type ClientItemAuthenticationWithPasswordFailure = {
  __typename?: "ClientItemAuthenticationWithPasswordFailure";
  message: Scalars["String"]["output"];
};

export type ClientItemAuthenticationWithPasswordResult =
  | ClientItemAuthenticationWithPasswordFailure
  | ClientItemAuthenticationWithPasswordSuccess;

export type ClientItemAuthenticationWithPasswordSuccess = {
  __typename?: "ClientItemAuthenticationWithPasswordSuccess";
  item: User;
  sessionToken: Scalars["String"]["output"];
};

export type CreateInitialUserInput = {
  adminPassword?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Float"]["input"]>>;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["ID"]["output"];
  members?: Maybe<Array<User>>;
  membersCount?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type GroupMembersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UserWhereInput;
};

export type GroupMembersCountArgs = {
  where?: UserWhereInput;
};

export type GroupCreateInput = {
  members?: InputMaybe<UserRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type GroupManyRelationFilter = {
  every?: InputMaybe<GroupWhereInput>;
  none?: InputMaybe<GroupWhereInput>;
  some?: InputMaybe<GroupWhereInput>;
};

export type GroupOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type GroupRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  create?: InputMaybe<Array<GroupCreateInput>>;
};

export type GroupRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  create?: InputMaybe<Array<GroupCreateInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
};

export type GroupUpdateArgs = {
  data: GroupUpdateInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateInput = {
  members?: InputMaybe<UserRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  id?: InputMaybe<IdFilter>;
  members?: InputMaybe<UserManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type Inquiry = {
  __typename?: "Inquiry";
  addresed?: Maybe<Scalars["Boolean"]["output"]>;
  address?: Maybe<Scalars["String"]["output"]>;
  age?: Maybe<Scalars["Float"]["output"]>;
  aiSelected?: Maybe<Scalars["String"]["output"]>;
  currentLivingSituation?: Maybe<Scalars["String"]["output"]>;
  diseases?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  medications?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  reasonOfApplication?: Maybe<Scalars["String"]["output"]>;
  remarks?: Maybe<Scalars["String"]["output"]>;
  yearlyIncome?: Maybe<Scalars["Float"]["output"]>;
};

export type InquiryCreateInput = {
  addresed?: InputMaybe<Scalars["Boolean"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  age?: InputMaybe<Scalars["Float"]["input"]>;
  currentLivingSituation?: InputMaybe<Scalars["String"]["input"]>;
  diseases?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  medications?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  reasonOfApplication?: InputMaybe<Scalars["String"]["input"]>;
  remarks?: InputMaybe<Scalars["String"]["input"]>;
  yearlyIncome?: InputMaybe<Scalars["Float"]["input"]>;
};

export type InquiryOrderByInput = {
  addresed?: InputMaybe<OrderDirection>;
  address?: InputMaybe<OrderDirection>;
  age?: InputMaybe<OrderDirection>;
  currentLivingSituation?: InputMaybe<OrderDirection>;
  diseases?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  gender?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  medications?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  reasonOfApplication?: InputMaybe<OrderDirection>;
  remarks?: InputMaybe<OrderDirection>;
  yearlyIncome?: InputMaybe<OrderDirection>;
};

export type InquiryUpdateArgs = {
  data: InquiryUpdateInput;
  where: InquiryWhereUniqueInput;
};

export type InquiryUpdateInput = {
  addresed?: InputMaybe<Scalars["Boolean"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  age?: InputMaybe<Scalars["Float"]["input"]>;
  currentLivingSituation?: InputMaybe<Scalars["String"]["input"]>;
  diseases?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  medications?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  reasonOfApplication?: InputMaybe<Scalars["String"]["input"]>;
  remarks?: InputMaybe<Scalars["String"]["input"]>;
  yearlyIncome?: InputMaybe<Scalars["Float"]["input"]>;
};

export type InquiryWhereInput = {
  AND?: InputMaybe<Array<InquiryWhereInput>>;
  NOT?: InputMaybe<Array<InquiryWhereInput>>;
  OR?: InputMaybe<Array<InquiryWhereInput>>;
  addresed?: InputMaybe<BooleanFilter>;
  address?: InputMaybe<StringFilter>;
  age?: InputMaybe<FloatNullableFilter>;
  currentLivingSituation?: InputMaybe<StringFilter>;
  diseases?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  gender?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  medications?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
  reasonOfApplication?: InputMaybe<StringFilter>;
  remarks?: InputMaybe<StringFilter>;
  yearlyIncome?: InputMaybe<FloatNullableFilter>;
};

export type InquiryWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type KeystoneAdminMeta = {
  __typename?: "KeystoneAdminMeta";
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};

export type KeystoneAdminMetaListArgs = {
  key: Scalars["String"]["input"];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: "KeystoneAdminUIFieldGroupMeta";
  description?: Maybe<Scalars["String"]["output"]>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars["String"]["output"];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: "KeystoneAdminUIFieldMeta";
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars["Int"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  fieldMeta?: Maybe<Scalars["JSON"]["output"]>;
  isFilterable: Scalars["Boolean"]["output"];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars["Boolean"]["output"];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars["String"]["output"];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars["String"]["output"];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars["Int"]["output"];
};

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: "KeystoneAdminUIFieldMetaCreateView";
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = "edit",
  Hidden = "hidden",
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = "create",
  Read = "read",
  Update = "update",
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: "KeystoneAdminUIFieldMetaItemView";
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = "edit",
  Hidden = "hidden",
  Read = "read",
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = "form",
  Sidebar = "sidebar",
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: "KeystoneAdminUIFieldMetaListView";
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = "hidden",
  Read = "read",
}

export type KeystoneAdminUiListMeta = {
  __typename?: "KeystoneAdminUIListMeta";
  description?: Maybe<Scalars["String"]["output"]>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars["Boolean"]["output"];
  hideDelete: Scalars["Boolean"]["output"];
  initialColumns: Array<Scalars["String"]["output"]>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars["Boolean"]["output"];
  isSingleton: Scalars["Boolean"]["output"];
  itemQueryName: Scalars["String"]["output"];
  key: Scalars["String"]["output"];
  label: Scalars["String"]["output"];
  labelField: Scalars["String"]["output"];
  listQueryName: Scalars["String"]["output"];
  pageSize: Scalars["Int"]["output"];
  path: Scalars["String"]["output"];
  plural: Scalars["String"]["output"];
  singular: Scalars["String"]["output"];
};

export type KeystoneAdminUiSort = {
  __typename?: "KeystoneAdminUISort";
  direction: KeystoneAdminUiSortDirection;
  field: Scalars["String"]["output"];
};

export enum KeystoneAdminUiSortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type KeystoneMeta = {
  __typename?: "KeystoneMeta";
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: "Mutation";
  authclient_changePassword?: Maybe<Scalars["Boolean"]["output"]>;
  authclient_login?: Maybe<ClientItemAuthenticationWithPasswordResult>;
  authclient_register?: Maybe<Scalars["Boolean"]["output"]>;
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createGroup?: Maybe<Group>;
  createGroups?: Maybe<Array<Maybe<Group>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createInquiries?: Maybe<Array<Maybe<Inquiry>>>;
  createInquiry?: Maybe<Inquiry>;
  createPolicies?: Maybe<Array<Maybe<Policy>>>;
  createPolicy?: Maybe<Policy>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteGroup?: Maybe<Group>;
  deleteGroups?: Maybe<Array<Maybe<Group>>>;
  deleteInquiries?: Maybe<Array<Maybe<Inquiry>>>;
  deleteInquiry?: Maybe<Inquiry>;
  deletePolicies?: Maybe<Array<Maybe<Policy>>>;
  deletePolicy?: Maybe<Policy>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars["Boolean"]["output"];
  test?: Maybe<Scalars["String"]["output"]>;
  updateGroup?: Maybe<Group>;
  updateGroups?: Maybe<Array<Maybe<Group>>>;
  updateInquiries?: Maybe<Array<Maybe<Inquiry>>>;
  updateInquiry?: Maybe<Inquiry>;
  updatePolicies?: Maybe<Array<Maybe<Policy>>>;
  updatePolicy?: Maybe<Policy>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};

export type MutationAuthclient_ChangePasswordArgs = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type MutationAuthclient_LoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationAuthclient_RegisterArgs = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type MutationAuthenticateUserWithPasswordArgs = {
  adminPassword: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
};

export type MutationCreateGroupArgs = {
  data: GroupCreateInput;
};

export type MutationCreateGroupsArgs = {
  data: Array<GroupCreateInput>;
};

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};

export type MutationCreateInquiriesArgs = {
  data: Array<InquiryCreateInput>;
};

export type MutationCreateInquiryArgs = {
  data: InquiryCreateInput;
};

export type MutationCreatePoliciesArgs = {
  data: Array<PolicyCreateInput>;
};

export type MutationCreatePolicyArgs = {
  data: PolicyCreateInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};

export type MutationDeleteGroupArgs = {
  where: GroupWhereUniqueInput;
};

export type MutationDeleteGroupsArgs = {
  where: Array<GroupWhereUniqueInput>;
};

export type MutationDeleteInquiriesArgs = {
  where: Array<InquiryWhereUniqueInput>;
};

export type MutationDeleteInquiryArgs = {
  where: InquiryWhereUniqueInput;
};

export type MutationDeletePoliciesArgs = {
  where: Array<PolicyWhereUniqueInput>;
};

export type MutationDeletePolicyArgs = {
  where: PolicyWhereUniqueInput;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};

export type MutationTestArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateGroupArgs = {
  data: GroupUpdateInput;
  where: GroupWhereUniqueInput;
};

export type MutationUpdateGroupsArgs = {
  data: Array<GroupUpdateArgs>;
};

export type MutationUpdateInquiriesArgs = {
  data: Array<InquiryUpdateArgs>;
};

export type MutationUpdateInquiryArgs = {
  data: InquiryUpdateInput;
  where: InquiryWhereUniqueInput;
};

export type MutationUpdatePoliciesArgs = {
  data: Array<PolicyUpdateArgs>;
};

export type MutationUpdatePolicyArgs = {
  data: PolicyUpdateInput;
  where: PolicyWhereUniqueInput;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type PasswordFilter = {
  isSet: Scalars["Boolean"]["input"];
};

export type PasswordState = {
  __typename?: "PasswordState";
  isSet: Scalars["Boolean"]["output"];
};

export type Policy = {
  __typename?: "Policy";
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  policyName?: Maybe<Scalars["String"]["output"]>;
  policyURL?: Maybe<Scalars["String"]["output"]>;
};

export type PolicyCreateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  policyName?: InputMaybe<Scalars["String"]["input"]>;
  policyURL?: InputMaybe<Scalars["String"]["input"]>;
};

export type PolicyOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  policyName?: InputMaybe<OrderDirection>;
  policyURL?: InputMaybe<OrderDirection>;
};

export type PolicyUpdateArgs = {
  data: PolicyUpdateInput;
  where: PolicyWhereUniqueInput;
};

export type PolicyUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  policyName?: InputMaybe<Scalars["String"]["input"]>;
  policyURL?: InputMaybe<Scalars["String"]["input"]>;
};

export type PolicyWhereInput = {
  AND?: InputMaybe<Array<PolicyWhereInput>>;
  NOT?: InputMaybe<Array<PolicyWhereInput>>;
  OR?: InputMaybe<Array<PolicyWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  policyName?: InputMaybe<StringFilter>;
  policyURL?: InputMaybe<StringFilter>;
};

export type PolicyWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  authenticatedItem?: Maybe<AuthenticatedItem>;
  group?: Maybe<Group>;
  groups?: Maybe<Array<Group>>;
  groupsCount?: Maybe<Scalars["Int"]["output"]>;
  inquiries?: Maybe<Array<Inquiry>>;
  inquiriesCount?: Maybe<Scalars["Int"]["output"]>;
  inquiry?: Maybe<Inquiry>;
  keystone: KeystoneMeta;
  policies?: Maybe<Array<Policy>>;
  policiesCount?: Maybe<Scalars["Int"]["output"]>;
  policy?: Maybe<Policy>;
  test?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars["Int"]["output"]>;
};

export type QueryGroupArgs = {
  where: GroupWhereUniqueInput;
};

export type QueryGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  orderBy?: Array<GroupOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: GroupWhereInput;
};

export type QueryGroupsCountArgs = {
  where?: GroupWhereInput;
};

export type QueryInquiriesArgs = {
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  orderBy?: Array<InquiryOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InquiryWhereInput;
};

export type QueryInquiriesCountArgs = {
  where?: InquiryWhereInput;
};

export type QueryInquiryArgs = {
  where: InquiryWhereUniqueInput;
};

export type QueryPoliciesArgs = {
  cursor?: InputMaybe<PolicyWhereUniqueInput>;
  orderBy?: Array<PolicyOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: PolicyWhereInput;
};

export type QueryPoliciesCountArgs = {
  where?: PolicyWhereInput;
};

export type QueryPolicyArgs = {
  where: PolicyWhereUniqueInput;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UserWhereInput;
};

export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  adminPassword?: Maybe<PasswordState>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  displayName?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  groups?: Maybe<Array<Group>>;
  groupsCount?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<UserRoleType>;
};

export type UserGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  orderBy?: Array<GroupOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: GroupWhereInput;
};

export type UserGroupsCountArgs = {
  where?: GroupWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: "UserAuthenticationWithPasswordFailure";
  message: Scalars["String"]["output"];
};

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordFailure
  | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: "UserAuthenticationWithPasswordSuccess";
  item: User;
  sessionToken: Scalars["String"]["output"];
};

export type UserCreateInput = {
  adminPassword?: InputMaybe<Scalars["String"]["input"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  groups?: InputMaybe<GroupRelateToManyForCreateInput>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<UserRoleType>;
};

export type UserLocalAuthWhereInput = {
  AND?: InputMaybe<Array<UserLocalAuthWhereInput>>;
  NOT?: InputMaybe<Array<UserLocalAuthWhereInput>>;
  OR?: InputMaybe<Array<UserLocalAuthWhereInput>>;
  id?: InputMaybe<IdFilter>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export enum UserRoleType {
  Admin = "admin",
  Dev = "dev",
  User = "user",
}

export type UserRoleTypeNullableFilter = {
  equals?: InputMaybe<UserRoleType>;
  in?: InputMaybe<Array<UserRoleType>>;
  not?: InputMaybe<UserRoleTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRoleType>>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  adminPassword?: InputMaybe<Scalars["String"]["input"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  groups?: InputMaybe<GroupRelateToManyForUpdateInput>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<UserRoleType>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  adminPassword?: InputMaybe<PasswordFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  groups?: InputMaybe<GroupManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  localAuth?: InputMaybe<UserLocalAuthWhereInput>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  authenticateUserWithPassword?:
    | { __typename: "UserAuthenticationWithPasswordFailure" }
    | {
        __typename: "UserAuthenticationWithPasswordSuccess";
        sessionToken: string;
      }
    | null;
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authenticateUserWithPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "adminPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "UserAuthenticationWithPasswordSuccess",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sessionToken" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
