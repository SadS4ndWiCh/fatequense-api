import type { IncomingHttpHeaders } from 'http2';
import type { ValueOf } from '~/types/utils';

import { ROUTES } from '~/core/scrapers/siga/siga.constants';

export type BuildRequestProps = {
  method:
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';
  route: ValueOf<typeof ROUTES>;
  headers?: IncomingHttpHeaders;
  data?: any;
  params?: string;
};

export type GetRequestProps = Omit<BuildRequestProps, 'method' | 'data'> & {
  token: string;
};

export type PostRequestProps = Omit<BuildRequestProps, 'method'>;

export interface IDisciplineRaw {
  ACD_DisciplinaSigla: string;
  ACD_DisciplinaNome: string;
  Pro_PessoalNome: string;
}

export interface IDisciplineLessonsRaw {
  ACD_PlanoEnsinoConteudoTituloAula: string;
  ACD_PlanoEnsinoConteudoDataAula: string;
  Presencas: number;
  Ausencias: number;
}

export interface IDisciplinePartialAbsencesRaw extends IDisciplineRaw {
  Aulas: IDisciplineLessonsRaw[];
  TotalAusencias: number;
  TotalPresencas: number;
}

export interface IDisciplineHistoryRaw extends IDisciplineRaw {
  ACD_AlunoHistoricoItemMediaFinal: number;
  ACD_AlunoHistoricoItemQtdFaltas: number;
  ACD_AlunoHistoricoItemFrequencia: number;
  GER_TipoObservacaoHistoricoDescricao: string;
  ACD_AlunoHistoricoItemDesistenciaData: string;
  ACD_AlunoHistoricoItemAprovada: 0 | 1;
}

export type ExamTitle = 'P1' | 'P2' | 'P3';

export interface IDisciplineExamDateRaw {
  ACD_PlanoEnsinoAvaliacaoTitulo: ExamTitle;
  ACD_PlanoEnsinoAvaliacaoDataPrevista: string;
  Avaliacoes: {
    ACD_PlanoEnsinoAvaliacaoParcialNota: number;
    ACD_PlanoEnsinoAvaliacaoParcialDataLancamento: string;
  }[];
}
export interface IDisciplinePartialGradeRaw extends IDisciplineRaw {
  ACD_AlunoHistoricoItemMediaFinal: number;
  Datas: IDisciplineExamDateRaw[];
}

export interface GXState {
  vUNI_UNIDADENOME_MPAGE: string;
  vACD_CURSONOME_MPAGE: string;
  vSITUACAO_MPAGE: string;
  vINSTITUCIONALFATEC: string;

  vALU_ALUNONOTAS_SDT: IDisciplineHistoryRaw[];
  vFALTAS: IDisciplinePartialAbsencesRaw[];
  vACD_ALUNONOTASPARCIAISRESUMO_SDT: IDisciplinePartialGradeRaw[];
  vACD_PERIODODESCRICAO_MPAGE: string;
  vALU_ALUNOHISTORICOITEM_SDT: IDisciplineRaw[];
  vPRO_PESSOALNOME: string;
  vACD_ALUNOCURSOREGISTROACADEMICOCURSO: string;
  vACD_ALUNOCURSOCICLOATUAL: string;
  vACD_ALUNOCURSOINDICEPP: string;
  vACD_ALUNOCURSOINDICEPR: string;
  vMAX_ACD_ALUNOCURSOINDICEPR: string;
  vSEMESTRESCURSADOS: string;

  vTEXTO: string;

  vPRO_PESSOALEMAIL: string;
  vPRO_PESSOALDOCSCPF: string;
  vPRO_PESSOALDATANASCIMENTO: string;
}
