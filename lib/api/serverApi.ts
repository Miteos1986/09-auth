import { Note } from "@/types/note";
import { API } from "./api";

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
