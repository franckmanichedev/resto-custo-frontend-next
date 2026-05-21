export const orgKey = (organizationId?: string | null) => ['organization', organizationId]
export const branchKey = (organizationId?: string | null, branchId?: string | null) => ['branch', organizationId, branchId]

export const menuItemsKey = (organizationId?: string | null, branchId?: string | null) => [...branchKey(organizationId, branchId), 'menuItems']

export default { orgKey, branchKey, menuItemsKey }
