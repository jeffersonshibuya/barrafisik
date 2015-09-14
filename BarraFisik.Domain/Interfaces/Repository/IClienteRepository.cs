﻿using System;
using System.Collections.Generic;
using BarraFisik.Domain.Entities;

namespace BarraFisik.Domain.Interfaces.Repository
{
    public interface IClienteRepository : IRepositoryBase<Cliente>
    {
        Cliente GetClienteHorario(Guid id);
        IEnumerable<Cliente> GetAniversariantes(int mes);
    }
}