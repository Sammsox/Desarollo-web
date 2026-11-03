import { request } from "./client.js";

const RESOURCE = "/api/tasks";

export const tasksApi = {
  list: (filters) => request(RESOURCE, { params: filters }),
  summary: () => request(`${RESOURCE}/summary`),
  create: (task) => request(RESOURCE, { method: "POST", body: task }),
  update: (id, changes) => request(`${RESOURCE}/${id}`, { method: "PATCH", body: changes }),
  remove: (id) => request(`${RESOURCE}/${id}`, { method: "DELETE" }),
};
