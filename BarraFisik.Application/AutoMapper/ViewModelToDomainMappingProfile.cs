﻿using AutoMapper;
using BarraFisik.Application.ViewModels;
using BarraFisik.Domain.Entities;
using BarraFisik.Domain.ValueObjects;

namespace BarraFisik.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public override string ProfileName {
            get { return "ViewModelToDomainMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<ClienteHorarioViewModel, Cliente>();
            Mapper.CreateMap<ClienteHorarioViewModel, Horario>();

            Mapper.CreateMap<ClienteViewModel, Cliente>();
            Mapper.CreateMap<HorarioViewModel, Horario>();
            Mapper.CreateMap<TotalHorarioViewModel, TotalHorario>();
            Mapper.CreateMap<ClienteHorarioViewModel, ClienteHorario>();
            Mapper.CreateMap<FilaEsperaViewModel, FilaEspera>();
            Mapper.CreateMap<MensalidadesViewModel, Mensalidades>();
            Mapper.CreateMap<TotalInscritosViewModel, TotalInscritos>();
        }
    }
}