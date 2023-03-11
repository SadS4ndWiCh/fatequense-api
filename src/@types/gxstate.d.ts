 interface IDisciplineRaw {
	ACD_DisciplinaSigla: string;
	ACD_DisciplinaNome: string;
	Pro_PessoalNome: string;
}

interface IDisciplineLessonsRaw {
	ACD_PlanoEnsinoConteudoTituloAula: string;
	ACD_PlanoEnsinoConteudoDataAula: string;
	Presencas: number;
	Ausencias: number;
}

interface IDisciplinePartialAbsencesRaw extends IDisciplineRaw {
	Aulas: IDisciplineLessonsRaw[];
	TotalAusencias: number;
	TotalPresencas: number;
}

interface IDisciplineHistoryRaw extends IDisciplineRaw {
	ACD_AlunoHistoricoItemMediaFinal: number;
	ACD_AlunoHistoricoItemQtdFaltas: number;
	ACD_AlunoHistoricoItemFrequencia: number;
	GER_TipoObservacaoHistoricoDescricao: string;
	ACD_AlunoHistoricoItemDesistenciaData: string;
	ACD_AlunoHistoricoItemAprovada: 0 | 1;
}

type ExamTitle = 'P1' | 'P2' | 'P3';

interface IDisciplineExamDateRaw {
	ACD_PlanoEnsinoAvaliacaoTitulo: ExamTitle;
	ACD_PlanoEnsinoAvaliacaoDataPrevista: string;
	Avaliacoes: {
		ACD_PlanoEnsinoAvaliacaoParcialNota: number;
		ACD_PlanoEnsinoAvaliacaoParcialDataLancamento: string;
	}[];
}
interface IDisciplinePartialGradeRaw extends IDisciplineRaw {
	ACD_AlunoHistoricoItemMediaFinal: number;
	Datas: IDisciplineExamDateRaw[];
}

interface GXState {
	vUNI_UNIDADENOME_MPAGE: string;
	vACD_CURSONOME_MPAGE: string;
	vSITUACAO_MPAGE: string;
	vINSTITUCIONALFATEC: string;

	vALU_ALUNONOTAS_SDT: DisciplineHistoryRaw[];
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