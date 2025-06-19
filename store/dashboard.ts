export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    //Tickets
    tickets: [] as any[],
    selectedTicket: null as any,
    messages: [] as any[],
    loading: false,
    ticketStatusFilter: "ALL" as "ALL" | "OPEN" | "ASSIGNED",

    //Agents
    agents: [] as any[],

    //meta connect
    redirectUrl: null as string | null,
    metaConnectData: null as any,
    loadingMeta: false,
    error: null as string | null,
  }),

  getters: {
    filteredTickets(state) {
      if (state.ticketStatusFilter === "ALL") return state.tickets;
      return state.tickets.filter(
        (ticket) => ticket.status === state.ticketStatusFilter
      );
    },
  },

  actions: {
    // ================== Tickets ==================
    async fetchTickets() {
      this.loading = true;
      try {
        const data = await $fetch<any[]>("/api/dashboard/tickets");
        this.tickets = data;
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        this.loading = false;
      }
    },

    async selectTicket(ticket: any) {
      this.selectedTicket = ticket;
      await this.fetchMessages(ticket.id);
    },

    async fetchMessages(ticketId: string) {
      try {
        const data = await $fetch<any[]>(
          `/api/dashboard/messages?ticketId=${ticketId}`
        );
        this.messages = data;
      } catch (error) {
        console.error("Error fetching messages:", error);
        this.messages = [];
      }
    },

    // ================== Agents ==================

    async fetchAgents() {
      try {
        const data = await $fetch<any[]>("/api/dashboard/Agents/get");
        this.agents = data;
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    },

    async deleteAgent(id: string) {
      try {
        await $fetch(`/api/dashboard/Agents/${id}`, {
          method: "DELETE",
        });
        this.agents = this.agents.filter((a) => a.id !== id);
      } catch (error) {
        console.error("Error deleting agent:", error);
      }
    },

    async updateAgent(id: string, updatedData: any) {
      try {
        await $fetch(`/api/dashboard/Agents/${id}`, {
          method: "PATCH",
          body: updatedData,
        });

        const index = this.agents.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.agents[index] = { ...this.agents[index], ...updatedData };
        }
      } catch (error) {
        console.error("Error updating agent:", error);
      }
    },

    async addAgent(newAgent: { name: string; email: string; phone: null }) {
      try {
        const createdAgent = await $fetch<any>("/api/dashboard/Agents/post", {
          method: "POST",
          body: newAgent,
        });
        this.agents.push(createdAgent);
      } catch (error) {
        console.error("Error adding agent:", error);
      }
    },

    // ================== meta connect ==================
    
    async metaConnect() {
      this.loadingMeta = true;
      this.error = null;

      try {
        const res = await $fetch<{ redirectUrl?: string; [key: string]: any }>(
          "/api/dashboard/meta"
        );

        if (res.redirectUrl) {
          this.redirectUrl = res.redirectUrl;
          this.metaConnectData = null;
        } else {
          this.metaConnectData = res;
          this.redirectUrl = null;
        }
      } catch (err: any) {
        this.error = err.message || "Error during metaConnect";
        this.redirectUrl = null;
        this.metaConnectData = null;
      } finally {
        this.loadingMeta = false;
      }
    },
    async sdkConnect(){
      this.loadingMeta = true;
      this.error = null;

      try {
        const res = await $fetch('/api/dashboard/sdk-info')
        return res;
      } catch (err: any) {
        this.error = "Error during sdkConnect";
      } finally {
        this.loadingMeta = false;
      } 
    }
  },
});
