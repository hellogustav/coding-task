import React from 'react';

const SidebarContext = React.createContext({ expanded: false });

export const SidebarProvider = SidebarContext.Provider;
export const SidebarConsumer = SidebarContext.Consumer;
export default SidebarContext;
