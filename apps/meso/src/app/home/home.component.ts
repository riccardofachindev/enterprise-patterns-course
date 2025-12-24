import { Component, OnInit } from '@angular/core';
import { Projects } from '@angular/cli/lib/config/schema';

/* interface BaseEntity {
  id: string | null;
} */

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

const peter: Client = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Acne',
};

const john: Client = {
  id: '2',
  firstName: 'John',
  lastName: 'Doe',
  company: 'NA',
};

const clients: Client[] = [peter, john];

interface ClientState {
  clients: Client[];
  currentClient: Client;
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

const initialClientsState: ClientState = {
  clients,
  currentClient: newClient,
};

interface BaseEntity {
  id: string;
}

interface Project extends BaseEntity {
  name: string;
  description: string;
  difficulty: number | null;
}

const projectOne: Project = {
  id: '1',
  name: 'Course project',
  description: 'Learn architecture',
  difficulty: 4,
};

const projectTwo: Project = {
  id: '2',
  name: 'Cook project',
  description: 'Learn cooking',
  difficulty: 3,
};

const projects: Project[] = [projectOne, projectTwo];

interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}

const newProject: Project = {
  id: null,
  name: '',
  description: '',
  difficulty: null,
};

const initialProjectState: ProjectsState = {
  projects,
  currentProject: newProject,
};

interface AppState {
  clientsState: ClientState;
  projectsState: ProjectsState;
}

const appState: AppState = {
  clientsState: initialClientsState,
  projectsState: initialProjectState,
};

class ProjectsStore {
  state: ProjectsState;

  constructor(state: ProjectsState) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }
}

const projectsStore = new ProjectsStore(initialProjectState);
const projectsInStore = projectsStore.select('projects');

enum ActionTypesEnum {
  CLIENT_LOAD = '[Client] Load',
  CLIENT_CREATE = '[Client] Create',
  CLIENT_UPDATE = '[Client] Update',
  CLIENT_DELETE = '[Client] Delete',
  CLIENT_SELECT = '[Client] Select',
  CLIENT_CLEAR = '[Client] Clear',
}

interface Action {
  type: ActionTypesEnum;
  payload: any;
}

const loadClients = (state: ClientState, clients: Client[]): ClientState => {
  return {
    clients,
    currentClient: state.currentClient,
  };
};

const selectClient = (state: ClientState, client: Client): ClientState => {
  return {
    clients: state.clients,
    currentClient: client,
  };
};

const deleteClient = (state: ClientState, client: Client): ClientState => {
  return {
    clients: state.clients.filter((c) => c.id !== client.id),
    currentClient: state.currentClient,
  };
};

const clearClient = (state: ClientState): ClientState => {
  return {
    clients: state.clients,
    currentClient: null,
  };
};

const createClient = (state: ClientState, client: Client): ClientState => {
  return {
    clients: [...state.clients, client],
    currentClient: state.currentClient,
  };
};

const updateClient = (state: ClientState, client: Client): ClientState => {
  return {
    clients: state.clients.map((selClient) => {
      return selClient.id === client.id ? Object.assign({}, client) : selClient;
    }),
    currentClient: state.currentClient,
  };
};

const clientsReducer = (
  state: ClientState = initialClientsState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypesEnum.CLIENT_LOAD:
      return loadClients(state, action.payload);
    case ActionTypesEnum.CLIENT_SELECT:
      return selectClient(state, action.payload);
    case ActionTypesEnum.CLIENT_CLEAR:
      return clearClient(state);
    case ActionTypesEnum.CLIENT_CREATE:
      return createClient(state, action.payload);
    case ActionTypesEnum.CLIENT_UPDATE:
      return updateClient(state, action.payload);
    case ActionTypesEnum.CLIENT_DELETE:
      return deleteClient(state, action.payload);
    default:
      return state;
  }
};

class ClientsStore {
  reducer;
  state: ClientState;

  constructor(state: ClientState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }

  /*
  load(newClients: Client[]) {
    this.clients = newClients;
  }

  select(client: Client) {
    this.currentClient = client;
  }

  create(client: Client) {
    this.clients = [...this.clients, client];
  }
*/
}

const clientStore = new ClientsStore(initialClientsState, clientsReducer);
const currentClient = clientStore.select('currentClient');

const aClient = clientStore.select('currentClient');

const mia: Client = {
  id: '123',
  firstName: 'Mia',
  lastName: 'Martini',
  company: 'Anon',
};

clientStore.dispatch({ type: ActionTypesEnum.CLIENT_CREATE, payload: mia });
const allClients = clientStore.select('clients');

const tango = allClients;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
