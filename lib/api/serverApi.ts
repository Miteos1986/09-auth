//import { api } from "@/app/api/api";

import { Note } from "@/types/note";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { API } from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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
  const cookieStore = cookies();

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

  const { data } = await API.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const cookieStore = cookies();

  const { data } = await API.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookieStore = cookies();

  const { data } = await API.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.success;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const { data } = await API.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
