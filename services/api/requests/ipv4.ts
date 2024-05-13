import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Ipv4Descriptor } from "@/types/Ipv4Descriptor";

import Ipv4Record from "../types/Ipv4Record";
import QueryKey from "../types/QueryKey";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/ipv4`;

export function useIpv4s() {
  return useQuery({
    queryKey: [QueryKey.Ipv4s],
    async queryFn() {
      const { data } = await axios.get<Ipv4Record[]>("/", { baseURL });
      return data;
    },
  });
}

export function useIpv4(id?: number) {
  return useQuery({
    queryKey: [QueryKey.Ipv4, id],
    async queryFn() {
      if (id) {
        const { data } = await axios.get<Ipv4Record>(`/${id}`, { baseURL });
        return data;
      }
    },
  });
}

export function useCreateIpv4() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(payload: Ipv4Descriptor) {
      return axios.post("/", payload, { baseURL });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Ipv4s] });
    },
  });
}

export function useUpdateIpv4(id?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(payload: Ipv4Descriptor) {
      return axios.put(`/${id}`, payload, { baseURL });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Ipv4s] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.Ipv4, id] });
    },
  });
}
