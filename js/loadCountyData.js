/**
 * Created by Billy on 2016-04-17.
 */


var CACountyData =[["Year","County","Wage","GINI","% High Tech","% Female","Unemployment Rate", "Wage Ratio 90 10", "Wage Ratio College High School", "High Low Labour Supply Ratio", "Female Wage Rate"],

    [	1996	,"	L A	",	41650	,	0.393	,	0.039	,	0.408	,	0.09	,	6.058	,	2.169	,	0.547	,	0.855	],
    [	1997	,"	L A	",	44415	,	0.417	,	0.035	,	0.411	,	0.076	,	6	,	2.155	,	0.607	,	0.888	],
    [	1998	,"	L A	",	43917	,	0.4	,	0.032	,	0.416	,	0.069	,	6	,	2.087	,	0.614	,	0.778	],
    [	1999	,"	L A	",	46673	,	0.442	,	0.036	,	0.398	,	0.068	,	6.42	,	2.315	,	0.544	,	0.791	],
    [	2000	,"	L A	",	43536	,	0.388	,	0.031	,	0.397	,	0.048	,	5.184	,	2.071	,	0.502	,	0.83	],
    [	2001	,"	L A	",	48545	,	0.402	,	0.041	,	0.416	,	0.05	,	5.833	,	2.299	,	0.643	,	0.818	],
    [	2002	,"	L A	",	51542	,	0.404	,	0.035	,	0.424	,	0.07	,	5.538	,	2.168	,	0.656	,	0.79	],
    [	2003	,"	L A	",	49386	,	0.397	,	0.04	,	0.421	,	0.064	,	6	,	2.167	,	0.638	,	0.854	],
    [	2004	,"	L A	",	50117	,	0.405	,	0.041	,	0.418	,	0.066	,	5.357	,	2.12	,	0.611	,	0.855	],
    [	2005	,"	L A	",	49284	,	0.406	,	0.043	,	0.418	,	0.054	,	6.154	,	1.954	,	0.631	,	0.789	],
    [	1996	,"	S M	",	49563	,	0.29	,	0.061	,	0.485	,	0.017	,	3.947	,	1.98	,	0.923	,	0.843	],
    [	1997	,"	S M	",	56997	,	0.38	,	0.068	,	0.493	,	0.081	,	5.766	,	1.964	,	1.123	,	0.669	],
    [	1998	,"	S M	",	58456	,	0.356	,	0.063	,	0.463	,	0.058	,	4	,	1.415	,	1.711	,	0.599	],
    [	1999	,"	S M	",	50442	,	0.255	,	0.045	,	0.506	,	0.044	,	3.497	,	1.717	,	0.874	,	0.724	],
    [	2000	,"	S M	",	57681	,	0.366	,	0.049	,	0.451	,	0.02	,	5	,	2.134	,	0.837	,	0.866	],
    [	2001	,"	S M	",	65903	,	0.418	,	0.067	,	0.438	,	0.033	,	6	,	2.876	,	1.308	,	0.727	],
    [	2002	,"	S M	",	68150	,	0.389	,	0.126	,	0.441	,	0.02	,	5.467	,	2.293	,	1.29	,	0.783	],
    [	2003	,"	S M	",	60116	,	0.347	,	0.1	,	0.411	,	0.062	,	4.971	,	2.444	,	1.524	,	0.633	],
    [	2004	,"	S M	",	57223	,	0.37	,	0.061	,	0.414	,	0.007	,	5.571	,	1.659	,	1.352	,	0.983	],
    [	2005	,"	S M	",	74218	,	0.472	,	0.072	,	0.403	,	0.025	,	9.154	,	2.091	,	1.046	,	0.628	],
    [	1996	,"	S C	",	55955	,	0.349	,	0.133	,	0.457	,	0.051	,	5.998	,	1.923	,	0.895	,	0.694	],
    [	1997	,"	S C	",	54482	,	0.34	,	0.166	,	0.347	,	0.031	,	5.25	,	2.022	,	0.947	,	0.696	],
    [	1998	,"	S C	",	67945	,	0.379	,	0.113	,	0.406	,	0.034	,	5.05	,	1.942	,	1.042	,	0.676	],
    [	1999	,"	S C	",	69708	,	0.385	,	0.143	,	0.369	,	0.037	,	5.706	,	2.078	,	1.076	,	0.823	],
    [	2000	,"	S C	",	66176	,	0.387	,	0.159	,	0.341	,	0.04	,	6.244	,	2.397	,	1.002	,	0.696	],
    [	2001	,"	S C	",	76286	,	0.397	,	0.185	,	0.391	,	0.038	,	6.119	,	2.42	,	1.348	,	0.709	],
    [	2002	,"	S C	",	77717	,	0.421	,	0.197	,	0.43	,	0.053	,	7.184	,	2.811	,	1.306	,	0.673	],
    [	2003	,"	S C	",	73755	,	0.361	,	0.21	,	0.405	,	0.119	,	5.288	,	2.221	,	1.493	,	0.72	],
    [	2004	,"	S C	",	72041	,	0.367	,	0.146	,	0.444	,	0.08	,	5.575	,	2.216	,	1.702	,	0.642	],
    [	2005	,"	S C	",	77764	,	0.421	,	0.143	,	0.473	,	0.06	,	6.044	,	2.229	,	1.747	,	0.586	],
    [	1996	,"	So	",	49653	,	0.243	,	0.056	,	0.472	,	0.037	,	3.294	,	0.853	,	1.857	,	0.882	],
    [	1997	,"	So	",	43217	,	0.318	,	0.03	,	0.333	,	0.019	,	4.727	,	1.36	,	1.067	,	0.821	],
    [	1998	,"	So	",	47839	,	0.303	,	0.028	,	0.472	,	0.034	,	4	,	1.269	,	1.044	,	0.673	],
    [	1999	,"	So	",	48650	,	0.318	,	0.081	,	0.486	,	0.053	,	7.5	,	1.832	,	0.769	,	0.514	],
    [	2000	,"	So	",	55807	,	0.316	,	0.121	,	0.394	,	0.094	,	4.444	,	1.817	,	1.063	,	0.479	],
    [	2001	,"	So	",	70645	,	0.426	,	0.094	,	0.377	,	0.032	,	7.62	,	2.006	,	0.998	,	0.763	],
    [	2002	,"	So	",	56518	,	0.399	,	0.042	,	0.394	,	0.083	,	3.875	,	3.233	,	0.539	,	1.259	],
    [	2003	,"	So	",	51048	,	0.327	,	0.058	,	0.385	,	0.098	,	3.247	,	2.229	,	0.568	,	0.658	],
    [	2004	,"	So	",	53004	,	0.311	,	0.056	,	0.417	,	0.018	,	5.357	,	1.108	,	0.506	,	0.752	],
    [	2005	,"	So	",	63062	,	0.344	,	0.122	,	0.327	,	0.036	,	5.667	,	2.009	,	0.877	,	0.813	],
];

