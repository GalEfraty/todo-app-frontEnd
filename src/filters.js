// Set up filters default object
const filters =
{
    m_SearchText: '',
    m_HideCompleted: false
}

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = (i_Updates) =>
{
    if(typeof i_Updates.m_SearchText === 'string')
    {
        filters.m_SearchText = i_Updates.m_SearchText
    }
    if(typeof i_Updates.m_HideCompleted === 'boolean')
    {
        filters.m_HideCompleted = i_Updates.m_HideCompleted
    }
}

// Make sure to set up the exports
export {getFilters, setFilters}