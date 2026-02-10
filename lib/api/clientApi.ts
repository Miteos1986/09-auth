import { User } from "@/types/user";
import { API } from "./api";
import { CreateNote, Note } from "@/types/note";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search !== "") {
    params.search = search;
  }

  if (tag && tag !== "") {
    params.tag = tag;
  }

  const response = await API.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const response = await API.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export async function register(payload: RegisterRequest) {
  const { data } = await API.post<User>("/auth/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function login(payload: LoginRequest) {
  const { data } = await API.post<User>("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const response = await API.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await API.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export async function logout() {
  await API.post("/auth/logout");
}

export async function checkSession() {
  const { data } = await API.get<{ success: boolean }>("/auth/session");

  return data.success;
}

export async function getMe() {
  const { data } = await API.get<User>("/users/me");

  return data;
}

export async function updateMe(payload: { username: string }): Promise<User> {
  const { data } = await API.patch<User>("/users/me", payload);
  return data;
}
