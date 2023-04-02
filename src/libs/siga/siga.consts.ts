export const BASE_URL = 'https://siga.cps.sp.gov.br';

export const AUTH_COOKIE_FIELD_NAME = 'ASP.NET_SessionId';

export const USER_INPUT_ID = 'vSIS_USUARIOID';
export const PASS_INPUT_ID = 'vSIS_USUARIOSENHA';
export const BTN_CONFIRM_ID = 'BTCONFIRMA';

export const USER_AGENT =
	'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

export const GX_STATE = `{"_EventName":"E'EVT_CONFIRMAR'.","_EventGridId":"","_EventRowId":"","MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vSAIDA":"","vREC_SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"D1ABEAAE18039C602CD8FD7385F248CD","AJAX_SECURITY_TOKEN":"84F199CDDB0C58592A768EFD8B54412708BB9745AE6F886B5BA6C30E7C998AEA","GX_CMP_OBJS":{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResourceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModified":"1"}`;

export const STATUS_REDIRECT = 303;
export const ROUTES = {
	login: '/aluno/login.aspx',
	home: '/aluno/home.aspx',
	partialGrade: '/aluno/notasparciais.aspx',
	schedule: '/aluno/horario.aspx',
	partialAbsences: '/aluno/faltasparciais.aspx',
	examsCalendar: '/aluno/calendarioprovas.aspx',
	schoolGrade: '/aluno/historicograde.aspx',
	history: '/aluno/historicocompleto.aspx',
} as const;